<template>
    <div class="mt-10" >
        <DataTable :value="computed_tickets" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" removableSort showGridlines >
            <template #empty >
                <h5 class="text-center" >NO TICKET FOUND</h5>
            </template>
            <Column sortable header="TICKET ID" >
                <template #body={data,index} >
                    {{new Date(data.received).getFullYear()}}-{{data.ticket_id}}
                </template>
            </Column>
            <Column sortable header="Fullname" class="capitalize" >
                <template #body={data,index} >
                    {{data.firstname}} {{data.lastname}}
                </template>
            </Column>
            <Column sortable header="DEVICENO" class="uppercase" >
                <template #body={data,index} >
                    {{data.prefix}}-{{data.device}}
                </template>
            </Column>
            <Column field="division" sortable header="DIVISION" class="capitalize" ></Column>
            <Column field="section" sortable header="SECTION" class="capitalize" ></Column>
            <Column sortable header="RECIEVED" >
                <template #body={data,idnex} >
                    {{new Date(data.received).toLocaleDateString()}}
                </template>
            </Column>
            <Column header="ACTION" >
                <template #body="{data,index}" >
                    <div class="flex gap-3 justify-center" >
                        <i @click="getAssignedID(data.assigned_id)" class="pi pi-file cursor-pointer hover:text-slate-300" ></i>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
    <Teleport to="#teleportModal" >
        <div v-if="modalDetail" class="bg-black/70 h-screen w-screen absolute top-0 z-50 grid place-content-center" >
            <div class="p-10 bg-white rounded-[10px] md:w-[800px]" >
                <div class="flex justify-end" >
                    <span @click="modalDetail = false" class="text-red-500 cursor-pointer hover:text-red-300" >
                        <i class=" text-[20px] pi pi-times-circle" ></i>
                    </span>
                </div>
                <div class="" >
                    <!-- <div class="flex justify-between" >
                        <div class="flex gap-5" >
                            <span class="uppercase font-semibold" >Date Received:</span>
                            <span>{{new Date(ticketDataHolder[0].received).toLocaleDateString()}}</span>
                        </div>
                    </div>
                    <div class="flex justify-between" >
                        <div class="flex gap-5" >
                            <span class="uppercase font-semibold">Requested by:</span>
                            <span>{{ticketDataHolder[0].firstname}} {{ticketDataHolder[0].lastname}}</span>
                        </div>
                        <div class="flex gap-5" >
                            <span class="uppercase font-semibold">Location:</span>
                            <span>{{ticketDataHolder[0].section}}</span>
                        </div>
                    </div>
                    <div class="flex justify-between" >
                        <div class="flex gap-5" >
                            <span class="uppercase font-semibold">Service Request No.:</span>
                            <span>{{new Date(ticketDataHolder[0].received).getFullYear()}}-{{ticketDataHolder[0].ticket_id}}</span>
                        </div>
                        <div class="flex gap-5" >
                            <span class="uppercase font-semibold">Computer NO/Printer NO:</span>
                            <span>{{ticketDataHolder[0].prefix}}-{{ticketDataHolder[0].device}}</span>
                        </div>
                    </div> -->
                    
                </div>
                <div class="mt-5" >
                    <!-- <h6 class="uppercase font-semibold" >Description of the Problem(s).</h6>
                    <p class="capitalize" > 
                        {{ticketDataHolder[0].problem}}
                    </p> -->
                </div>
                <div class="mt-5 flex justify-end gap-5" >
                    <Button @click="confirmTakeAction" label="Take action" class="w-[200px] bg-custom-blue" icon="pi pi-wrench" iconPos="right" />
                </div>
            </div>
        </div>
        <div v-if="modalTakeAction"  class="bg-black/70 h-screen w-screen absolute top-0 z-50 grid place-content-center">
            <div class="bg-white p-10" >
                <div class="flex justify-end" >
                    <span @click="modalTakeAction = false" class="" >
                        <i class="pi pi-times-circle text-red-400 text-[25px] cursor-pointer"  ></i>
                    </span>
                </div>
                <div class="grid grid-cols-4 bg-custom-green-v2 h-[50px]" >
                    <div class="flex items-center border" >
                        <div class="pl-3" >
                            <span class="text-white font-semibold" >COMPUTER COMPONENT</span>
                        </div>
                    </div>
                    <div class="flex items-center border" >
                        <div class="pl-3" >
                            <span class="text-white font-semibold" >NETWORK</span>
                        </div>
                    </div>
                    <div class="flex items-center border" >
                        <div class="pl-3" >
                            <span class="text-white font-semibold" >SYSTEM</span>
                        </div>
                    </div>
                    <div class="flex items-center border" >
                        <div class="pl-3" >
                            <span class="text-white font-semibold" >OTHERS</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-4" >
                    <div class="border p-2" >
                        <div>
                            <div class="flex gap-3" >
                                <input type="checkbox"  v-model="checked.component.hardware" @change="(checked.component.hardware) ? false :true " >
                                <span>Hardware</span>
                            </div>
                            <div>
                                <InputText class="w-full" v-model="checked.component.hardwareSpecify" type="text" placeholder="Specify" />
                            </div>
                        </div>
                        <div>
                            <div class="flex gap-3" >
                                <input type="checkbox"  v-model="checked.component.software" @change="(checked.component.software) ? false :true " >
                                <span>Hardware</span>
                            </div>
                            <div>
                                <InputText class="w-full" v-model="checked.component.softwareSpecify" type="text" placeholder="Specify" />
                            </div>
                        </div>
                    </div>
                    <div class="border p-2" >
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.network.lan" @change="(checked.network.lan) ? false :true " >
                            <span>LAN</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.network.internet" @change="(checked.network.internet) ? false :true " >
                            <span>INTERNET</span>
                        </div>
                        <div >
                            <span>Other Specify</span>
                            <InputText class="w-full" v-model="checked.network.specify" type="text" placeholder="Specify" />
                        </div>
                    </div>
                    <div class="border p-2" >
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.his" @change="(checked.system.his) ? false :true " >
                            <span>HIS</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.lis" @change="(checked.system.lis) ? false :true " >
                            <span>LIS</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.dms" @change="(checked.system.dms) ? false :true " >
                            <span>DMS</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.eNgas" @change="(checked.system.eNgas) ? false :true " >
                            <span>E-NGAS</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.phic" @change="(checked.system.phic) ? false :true " >
                            <span>PHIC</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.packWithRis" @change="(checked.system.packWithRis) ? false :true " >
                            <span>PACS WITH RIS</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.system.hrips" @change="(checked.system.hrips) ? false :true " >
                            <span>HRIPS</span>
                        </div>
                        <div >
                            <span>Other Specify</span>
                            <InputText class="w-full" v-model="checked.system.specify" type="text" placeholder="Specify" />
                        </div>
                    </div>
                    <div class="border p-2" >
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.other.web" @change="(checked.other.web) ? false :true " >
                            <span>WEB</span>
                        </div>
                        <div class="flex gap-3" >
                            <input type="checkbox"  v-model="checked.other.training" @change="(checked.other.training) ? false :true " >
                            <span>TRAINING</span>
                        </div>
                        <div >
                            <span>Other Specify</span>
                            <InputText class="w-full" v-model="checked.other.specify" type="text" placeholder="Specify" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 mt-2 " >
                    <div class="border" >
                        <div class="font-semibold border p-2" >Description Of the Problem</div>
                        <p class="font-extralight capitalize p-2" >Lorem lorem lorem lorem</p>
                    </div>
                    <div class="border" >
                        <div class="font-semibold border p-2" >Taken Action</div>
                        <div class="p-2" >
                            <Textarea v-model="ticket_details.action" placeholder="Type here..." class="w-full" />
                        </div>
                    </div>
                    <div class="border" >
                        <div class="font-semibold border p-2" >Recommendation(s)</div>
                        <div class="p-2" >
                            <Textarea v-model="ticket_details.recommendation" placeholder="Type here..." class="w-full" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-5 gap-5" >
                    <Button @click="condemnedTicket"  class="bg-red-400 w-[200px]" label="Condemn" icon="pi pi-desktop" iconPos="right"  />
                    <Button @click="completedTicket" class="bg-custom-blue w-[200px]" label="Completed" icon="pi pi-check" iconPos="right"  />
                </div>
            </div>
        </div>
    </Teleport>
</template>
<script setup>
import { Teleport, computed, onMounted, reactive, ref} from 'vue';
import io from 'socket.io-client';
import { BASE_IO } from '@/utils/BASE_URL';
import { userStore } from '@/stores/user.store';
import Button from 'primevue/button';
import { ticketStore } from '@/stores/ticket.store';
import { useToast } from 'primevue/usetoast';
const socket = io(BASE_IO);

const toast = useToast();

const checked = reactive({
    component: {
        hardware: false,
        software: false,
        hardwareSpecify: '',
        softwareSpecify: ""
    },
    network: {
        lan: false,
        internet: false,
        specify: ""
    },
    system: {
        his: false,
        lis: false,
        dms: false,
        eNgas:false,
        phic: false,
        packWithRis: false,
        hrips: false,
        specify: ""
    },
    other: {
        web:false,
        training: false,
        specify: ""
    }
});

const ticket_details = reactive({
    action: "",
    recommendation: ""
})

const modalDetail = ref(false);
const modalTakeAction = ref(false);

const selectedTicket = ref(0);

const ticketDataHolder = ref()

const getAssignedID =(id)=>{
    modalDetail.value = true;
    selectedTicket.value = id;

    ticketDataHolder.value = tickets.value.filter((item)=>item.ticket_id == id);
}

const techID = ref(0);
const confirmTakeAction = async()=>{
    modalDetail.value = false;
    modalTakeAction.value = true;
    await ticketStore().actionTaken(selectedTicket.value);
    const  response = ticketStore().getResponse;
    if(response.status){
        techID.value = response.tech_support;
    }
    socket.emit('staff-assigned-ticket');
}

const condemnedTicket = async()=>{
    try {
        const categories = `{component:{software:${checked.component.software},hardware:${checked.component.hardware},hardwareSpecify:'${checked.component.hardwareSpecify}',softwareSpecify:'${checked.component.softwareSpecify}'},network:{lan:${checked.network.lan},internet:${checked.network.internet},specify:'${checked.network.specify}'},system: {his:${checked.system.his},lis:${checked.system.lis},dms:${checked.system.dms},eNgas:${checked.system.eNgas},phic:${checked.system.phic},packWithRis:${checked.system.packWithRis},hrips:${checked.system.hrips},specify:'${checked.system.specify}'},others: {web:${checked.other.web},training:${checked.other.training},specify:'${checked.other.specify}'}}`;

        const data = {
            action: ticket_details.action,
            recommendation: ticket_details.recommendation,
            categories: categories,
            assigned_ticket: selectedTicket.value,
            status: "condemned",
            tech_id: techID.value
        }

        await ticketStore().updateTakeAction(data);
        const response = ticketStore().getResponse;
        if(response.status){
            console.log( response.message)
            toast.add({severity:'error', summary: "Successfully",detail: response.message ,life: 2000})
            modalTakeAction.value = false;
        }

    } catch (error) {
        console.error(error)
    }
}

const completedTicket = async()=>{
    try {
        const categories = `{component:{software:${checked.component.software},hardware:${checked.component.hardware},hardwareSpecify:'${checked.component.hardwareSpecify}',softwareSpecify:'${checked.component.softwareSpecify}'},network:{lan:${checked.network.lan},internet:${checked.network.internet},specify:'${checked.network.specify}'},system: {his:${checked.system.his},lis:${checked.system.lis},dms:${checked.system.dms},eNgas:${checked.system.eNgas},phic:${checked.system.phic},packWithRis:${checked.system.packWithRis},hrips:${checked.system.hrips},specify:'${checked.system.specify}'},others: {web:${checked.other.web},training:${checked.other.training},specify:'${checked.other.specify}'}}`;

        const data = {
            action: ticket_details.action,
            recommendation: ticket_details.recommendation,
            categories: categories,
            assigned_ticket: selectedTicket.value,
            status: "completed",
            tech_id: techID.value
        }

        await ticketStore().updateTakeAction(data);
        const response = ticketStore().getResponse;
        if(response.status){
            console.log( response.message)
            toast.add({severity:'success', summary: "Successfully",detail: response.message ,life: 2000})
            modalTakeAction.value = false;
        }

    } catch (error) {
        console.error(error)
    }
}

const userInfoData = ref();
const UserInfo = async()=>{
    try {
        await userStore().info();
        userInfoData.value = userStore().getUserInfo;
    } catch (error) {
        console.error(error)
    }
}

const tickets = ref([]);

const computed_tickets = computed(()=>{
    return tickets.value.filter((ticket)=>{
        return ticket.staff == userInfoData.value.user_id;
    })
});

socket.on('update-ticket-staff',(data)=>{
    tickets.value = data;
    console.log(data)
});

const FetchTicketPending = ()=>{
    socket.on('pedingTickets',(data)=>{
        tickets.value = data;
    });
}

onMounted(async()=>{
    FetchTicketPending()
    await UserInfo()
})


</script>