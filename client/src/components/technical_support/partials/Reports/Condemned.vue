<template>
    <DataTable :value="computed_condemnend" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" removableSort showGridlines >
        <template #header >
            <div class="flex justify-between" >
                <div></div>
                <div>
                    <InputGroup>
                        <InputText v-model="search" type="text" placeholder="Search.." class="font-light" />
                        <InputGroupAddon>
                            <i class="pi pi-search" ></i>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        </template>
        <template #empty>
            <div class="text-center" >NO DATA FOUND</div>
        </template>
        <Column field="ticketID" sortable header="TICKET ID" ></Column>
        <Column field="firstname" sortable header="FIRSTNAME" class="capitalize" ></Column>
        <Column field="lastname" sortable header="LASTNAME" class="capitalize" ></Column>
        <Column field="device" sortable header="DEVICENO" class="uppercase" ></Column>
        <Column field="division" sortable header="DIVISION" class="capitalize" ></Column>
        <Column field="section" sortable header="SECTION" class="capitalize" ></Column>
        <Column field="received" sortable header="RECEIVED" ></Column>
        <Column field="started" sortable header="STARTED" ></Column>
        <Column field="finished" sortable header="FINISHED" ></Column>
        <Column field="conducted" header="CONDUCTED" class="capitalize" ></Column>
        <Column header="ACTION" >
            <template #body="{data,index}" >
                <Button @click="visible = true" class="bg-custom-blue pi pi-expand"/>
            </template>
        </Column>
    </DataTable>
    <Dialog  v-model:visible="visible" modal class="bg-white" >
        <template #header >
            <span></span>
        </template>
        <div class="" >
            <div class="grid grid-cols-[1fr,2fr] mt-2" >
                <strong ><i class="pi pi-desktop" >&nbsp;</i>DEVICE NO:</strong>
                <div>PJG-COMP-001</div>
            </div>
            <div class="grid grid-cols-[1fr,2fr] mt-2" >
                <strong ><i class="pi pi-calendar" >&nbsp;</i>RECEIVE DATE:</strong>
                <div>2024-03-24</div>
            </div>
            <div class="mt-3" >
                <strong>DESCRIPTION OF THE PROBLEM</strong>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reiciendis sunt cumque eius dolorem quam rerum porro vero delectus quasi soluta exercitationem architecto consectetur veritatis ad, nam nihil, est ipsa!</p>
            </div>
            <div class="mt-3" >
                <strong>ACTION TAKEN</strong>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reiciendis sunt cumque eius dolorem quam rerum porro vero delectus quasi soluta exercitationem architecto consectetur veritatis ad, nam nihil, est ipsa!</p>
            </div>
            <div class="mt-3" >
                <strong>RECOMMENDATION(S)</strong>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reiciendis sunt cumque eius dolorem quam rerum porro vero delectus quasi soluta exercitationem architecto consectetur veritatis ad, nam nihil, est ipsa!</p>
            </div>
        </div>
    </Dialog>
</template>
<script setup>

import { ref,computed } from 'vue';

const search = ref('')
const visible =ref(false);

const condemnendData = ref([
    {ticketID: '2020-01', firstname: 'john' , lastname: 'doe', device:'pjg-comp-001',division: "finance", section: 'accounting' ,received: '2024-03-24', started:'2024-03-24', finished:'2024-03-24',conducted: "mr. developer" }
]);

const computed_condemnend = computed(()=>{
    return condemnendData.value.filter((data)=>{
        return data.ticketID.toLowerCase().includes(search.value.toLowerCase()) || 
        data.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastname.toLowerCase().includes(search.value.toLowerCase()) || 
        data.division.toLowerCase().includes(search.value.toLowerCase()) || 
        data.section.toLowerCase().includes(search.value.toLowerCase()) || 
        data.conducted.toLowerCase().includes(search.value.toLowerCase())
    })
})

</script>