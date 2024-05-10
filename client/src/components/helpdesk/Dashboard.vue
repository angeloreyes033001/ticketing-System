<template>
    <main class="h-screen" >
        <div class="overflow-auto select-none" >
            <div class="h-[60px] flex justify-between sticky top-0 z-50 bg-slate-200/80 gap-2 font-light text-[16px] px-5" >
                <div class="flex items-center" >
                    <span>TICKTING SYSTEM</span>
                </div>
                <div class="flex gap-2" >
                    <div class="flex items-center" >
                        <span class="capitalize" >{{time}}&nbsp;</span>
                    </div>
                    <div class="flex items-center" >
                        <div class="h-[40px] w-[40px] hover:bg-slate-100 hover:shadow rounded-[50%] grid place-content-center" >
                            <i class="pi pi-cog" ></i>
                        </div>
                    </div>
                    <div class="flex items-center" >
                        <div class="h-[40px] w-[40px] hover:bg-slate-100 hover:shadow rounded-[50%] grid place-content-center" >
                            <i class="pi pi-user" ></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-10 py-5" >
                <div class="bg-slate-100/80 rounded-[10px] p-5" >
                    <DataTable :value="tickets" paginator :rows="10"  >
                        <template #empty >
                            <div class="text-center" >NO TICKET FOUND</div>
                        </template>
                        <Column header="Device No." >
                            <template #body="{data,id}" >{{data.prefix}}-{{ data.device }}</template>
                        </Column>
                        <Column field="form" header="Form" class="capitalize"  ></Column>
                        <Column header="Requested by." >
                            <template #body="{data,id}"  >
                                <div class=capitalize >
                                    {{data.firstname}}-{{ data.lastname }}
                                </div>
                            </template>
                        </Column>
                        <Column header="Received Date." >
                            <template #body="{data,id}"  >
                                <div class=capitalize >
                                    {{new Date(data.received).toLocaleDateString()}}
                                </div>
                            </template>
                        </Column>
                        <Column field="problem" header="Problem"   ></Column>
                        <Column header="Assign" >
                            <template #body="{data,index}"  >
                                <div class="flex gap-2" >
                                    <div v-if="selectedTicket == data.ticket_id" class="flex gap-3" >
                                        <select v-model="selectedStaff" class="h-[50px] w-full border rounded-[10px] px-3" >
                                            <option value="" selected disabled >SELECT IT STAFF</option>
                                            <option v-for="staff in technicalUserData" :value="staff.user_id" >{{ staff.firstname }} {{ staff.lastname }}</option>
                                        </select>
                                        <Button @click="assignedTicket(data.ticket_id)" icon="pi pi-save" class=" bg-custom-green" />
                                        <Button @click="selectTicket(0)" icon="pi pi-times" class=" bg-red-400" />
                                    </div>
                                    <Button v-else @click="selectTicket(data.ticket_id)" icon="pi pi-plus" class=" bg-custom-blue" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useDateFormat,useNow } from '@vueuse/core';
import { userStore } from '@/stores/user.store';
import { BASE_IO } from '@/utils/BASE_URL';
import sound from '../../assets/notification/sound-1.wav'
import io from 'socket.io-client'
import { ticketStore } from '@/stores/ticket.store';
const socket = io(BASE_IO);

const time = useDateFormat(useNow(),'ddd, h:m:ss AA');
const selectedStaff = ref('');
const selectedTicket = ref(0);

const assignedTicket = async(ticket)=>{
    const data = {
        ticket_id: ticket,
        assigned_in: selectedStaff.value
    }

    if(data.assigned_in == ''){
        return alert("Please select IT STAFF!!!");
    }

    await ticketStore().assigned(data);
    const response = ticketStore().getResponse;
    if(response.status){
        selectedStaff.value = '';
        selectedTicket.value = 0;
        socket.emit('helpdesk-assigned-ticket',(ticket));
        socket.emit('staff-assigned-ticket');
    }
}

const selectTicket = (id)=>{ selectedTicket.value = id; console.log(id) }

const tickets = ref([
    { ticket_id: 1, prefix: 'PJG-COMP', device: '001', form: 'service', firstname: 'mr', lastname: 'angelo', received: '2024-05-02 07:57:50.161', problem: "No internet Connection" }
])

const technicalUserData = ref([])
const technical_support_staff = async()=>{
    try {
        await userStore().readUserWithRole('technical_support');
        technicalUserData.value = userStore().getResponse;
    } catch (error) {
        console.error(error)
    }
}

socket.on('new-added-ticket',(data)=>{
    tickets.value = data;
    const inComing = new Audio(sound);
    inComing.play().catch(error=>{
        console.error(error)
    })
});

socket.on('update-ticket-helpdesk',(data)=>{
    tickets.value = data;
});

const FetchTickets =()=>{
    socket.on('tickets',(data)=>{
        tickets.value = data;
    })
}

onMounted(async()=>{
    await technical_support_staff();
    FetchTickets();
})

</script>