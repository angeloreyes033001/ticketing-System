<template>
    <DataTable :value="computed_inporcess" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" removableSort showGridlines >
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
        <Column field="recieved" sortable header="RECIEVED" ></Column>
        <Column field="started" sortable header="STARTED" ></Column>
        <Column field="conducting" header="CONDUCTING" class="capitalize" ></Column>
    </DataTable>
</template>
<script setup>

import { ref ,computed} from 'vue';
const search = ref('')
const inprocessData = ref([
    {ticketID: '2020-01', firstname: 'john' , lastname: 'doe', device:'pjg-comp-001',division: "finance", section: 'accounting' ,recieved: '2024-03-34',started:'2024-03-34', conducting: "mr. developer"}
]);

const computed_inporcess = computed(()=>{
    return inprocessData.value.filter((data)=>{
        return data.ticketID.toLowerCase().includes(search.value.toLowerCase()) || 
        data.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastname.toLowerCase().includes(search.value.toLowerCase()) || 
        data.division.toLowerCase().includes(search.value.toLowerCase()) || 
        data.section.toLowerCase().includes(search.value.toLowerCase()) || 
        data.conducting.toLowerCase().includes(search.value.toLowerCase())
    })
})

</script>