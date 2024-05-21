<template >
    <main class="bg-slate-100 h-screen overflow-auto select-none text-black/80" >
        <div class="h-[80px] flex justify-between sticky top-0 bg-slate-100 z-10" >
            <div class="flex items-center pl-10" >
                <strong>TICKETING SYSTEM</strong>
            </div>
            <div class="flex items-center pr-10 gap-5" >
                <div class="flex gap-2" >
                    <div class='flex items-center font-light capitalize' v-if="userInfoData" >{{ userInfoData.firstname }} {{ userInfoData.lastname }}</div>
                    <div class="cursor-pointer" >
                        <div class="p-2 hover:bg-custom-green hover:text-white rounded-[50%] h-[30px] w-[30px] grid place-content-center" >
                            <i class="pi pi-user" ></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-10 grid grid-cols-1 grid-rows-[auto,auto] lg:grid-cols-[1fr,400px] md:grid-rows-1 gap-5 " >
            <div class="order-2 lg:order-1" >
                <div class=" bg-white p-5 mt-5 rounded-[10px] shadow mb-10" >
                    <div class="flex justify-end my-2 " >
                        <Button @click="modalForm = true" label="  CREATE TICKET" class="w-[300px] pi pi-plus bg-custom-blue uppercase" />
                    </div>
                    <DataTable paginator :value="ticketData" :rows="10" :rowsPerPageOptions="[10, 20,50]" stripedRows removableSort  showGridlines >
                        <Column field="ticketID" header="TicketID" sortable="" class="uppercase"></Column>
                        <Column field="device" header="DeviceNo" sortable="" class="uppercase" ></Column>
                        <Column field="started" header="Date Started" sortable="" class="uppercase" ></Column>
                        <Column field="finished" header="Date Finished" sortable="" class="uppercase" ></Column>
                        <Column header="Action" sortable="" class="uppercase w-[10%] " >
                            <template #body={data}>
                                <div class="grid place-content-center" >
                                    <Button @click="modalExpand = true" icon="pi pi-expand" class="text-black" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <div class=" py-5 :order-1 lg:order-1" >
                <div>
                    <requestedForm title="IN PROCESS TICKET" :tickets="inProcessData" />
                </div>
            </div>
        </div>
    </main>
    <div v-if="modalForm" class="h-screen w-screen absolute top-0 left-0 bg-black/50 z-50 grid place-content-center select-none" >
        <div class="rounded-[10px] px-10 bg-white w-[80vw] md:w-[700px] pb-10 " >
            <div class="relative" >
                <div  @click="modalForm = false" class="h-[40px] w-[40px] absolute text-red-500 top-[-10px] right-[-50px] bg-white rounded-[50%] shadow grid place-content-center cursor-pointer" >
                    <i class="pi pi-times-circle text-[25px]" ></i>
                </div>
                <div class="h-[80px] grid grid-cols-4 gap-1" >
                    <div class="h-[70px] bg-custom-green cursor-pointer rounded-bl-[10px] rounded-br-[10px] grid place-content-center" >
                        <span class="font-semibold text-white" >SERVICE</span>
                    </div>
                    <div class="h-[70px] bg-custom-green cursor-pointer rounded-bl-[10px] rounded-br-[10px] grid place-content-center" >
                        <span class="font-semibold text-white" >WEB</span>
                    </div>
                    <div class="h-[70px] bg-custom-green cursor-pointer rounded-bl-[10px] rounded-br-[10px] grid place-content-center" >
                        <span class="font-semibold text-white" >NETWORK</span>
                    </div>
                    <div class="h-[70px] bg-custom-green cursor-pointer rounded-bl-[10px] rounded-br-[10px] grid place-content-center" >
                        <span class="font-semibold text-white" >UPDATE</span>
                    </div>
                </div>
                <div class="py-5" >
                    <form @submit.prevent="createTicket" class="" >
                        <div class="mb-2" >
                            <h6>
                                <strong class="text-red-500" >*</strong>
                                    <span>Device No.</span>
                                </h6>
                            <div class="grid grid-cols-[200px,1fr] gap-3" >
                                <div>
                                    <select v-model="forms.service.field.prefix"  class="h-[50px] w-full border rounded-[5px]  py-2" >
                                        <option v-for="data in prefixData" :value="data.prefix_id" >{{ data.prefix }}</option>
                                    </select>
                                </div>
                                <div>
                                    <InputText type="number" @keyup="onKeyNumberOnly" v-model="forms.service.field.device" min="0" placeholder="Number" class="w-full" />
                                    <small class="text-red-300" v-if="forms.service.error.device != ''" >{{ forms.service.error.device }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="mb-2" >
                            <h6>
                                <strong class="text-red-500" >*</strong>
                                <span>Description of the problem.</span>
                            </h6>
                            <Textarea  v-model="forms.service.field.problem" placeholder="Type here..." rows="5" cols="30" class="w-full" />
                            <small class="text-red-300" v-if="forms.service.error.problem !=''" >{{ forms.service.error.problem }}</small>
                        </div>
                        <div class="flex justify-end" >
                            <Button type="submit" class="pi pi-send bg-custom-green w-[200px]" label=" Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="modalExpand" class="h-screen w-screen absolute top-0 left-0 bg-black/50 z-50 grid place-content-center select-none" >
        <div class="rounded-[10px] px-10 bg-white w-[80vw] md:w-[700px] pb-10" >
            <div class="relative" >
                <div  @click="modalExpand = false" class="h-[40px] w-[40px] absolute text-red-500 top-[-10px] right-[-50px] bg-white rounded-[50%] shadow grid place-content-center cursor-pointer" >
                    <i class="pi pi-times-circle text-[25px]" ></i>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { prefixStore } from '@/stores/prefix.store';
import { defineAsyncComponent,onMounted,reactive,ref } from 'vue';
import { onlyNumeric } from '@/utils/validators/validators';
import { ticketStore } from '@/stores/ticket.store';
import { userStore } from '@/stores/user.store';
import { useToast } from 'primevue/usetoast';
import { BASE_IO } from '@/utils/BASE_URL';
import io from 'socket.io-client';
const socket = io(BASE_IO);

const toast = useToast();

const requestedForm = defineAsyncComponent(()=>import('@/components/end-users/partials/RequestedBox.vue'));

const inProcessData = ref([
    {
        device: "LAP-101",
        form: "Service",
        problem: 'Expired MS Office',
        started: "03-24-2024"
    },
    {
        device: "COMP-101",
        form: "Service",
        problem: 'Expired MS Office',
        started: "03-24-2024"
    }
])

const modalForm = ref(false);
const modalExpand = ref(false);

const forms =reactive( {
    service: {
        field:{
            prefix: 1,
            device: "",
            problem: ""
        },
        error:{
            device: "",
            problem: ""
        }
    }
});

const onKeyNumberOnly =()=>{
    if(forms.service.field.device != ''){
        return(!onlyNumeric(forms.service.field.device)) ? forms.service.error.device = "numerics only." : forms.service.error.device = ""
    }
    else{
        forms.service.error.device = ""
    }
}

const ticketData = ref([
    {
        ticketID: '2024-01',
        device: 'pjg-comp-001',
        started: '03-24-2024',
        finished: '03-24-2024'
    },
])

const createTicket = async()=>{
    try {
        
        const { prefix,device,problem} = forms.service.field;
        const requested = userInfoData.value.user_id;
        const form_id = 1; /// for now
        
        if(prefix == '') { return }
        if(device == '') { return forms.service.error.device = "required" }
        if(problem == '') { return forms.service.error.problem = "required" }
        if(!onlyNumeric(forms.service.field.device)){
            return forms.service.error.device = "Numeric only."
        }

        await ticketStore().create({prefix:prefix,device:device,problem:problem,requested: requested, form: form_id});
        const response = ticketStore().getResponse;
        if(response.status){
            forms.service.field.device = "";
            forms.service.field.problem = ""
            toast.add({severity:'success', summary: "Ticket",detail: "Successfully requested.",life: 2000})
            socket.emit('create-ticket');
        }

    } catch (error) {
        console.error(error);
    }
}

const prefixData = ref([])
const FetchPrefix = async()=>{
    try {
        await prefixStore().read()
        prefixData.value =  prefixStore().getPrefix;
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

onMounted(async()=>{
    await FetchPrefix();
    await UserInfo();
})

</script>