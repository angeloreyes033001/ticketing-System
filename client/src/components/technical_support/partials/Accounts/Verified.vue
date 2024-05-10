<template>
    <DataTable :value="computed_verified" paginator :rows="10" :rowsPerPageOptions="[10, 20,50]" stripedRows removableSort  showGridlines  >
        <template #header >
            <div class="flex justify-end" >
                <div class="w-[300px]" >
                    <InputGroup class="bg-white" >
                        <InputText v-model="search" type="text" placeholder="Search..." class="w-full font-light" />
                        <InputGroupAddon>
                            <i class="pi pi-search" ></i>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        </template>
        <template #empty> No users found. </template>
        <Column field="username" header="USERNAME" sortable="" ></Column>
        <Column field="firstname" header="FIRSTNAME" class="capitalize" sortable="" ></Column>
        <Column field="lastname" header="LASTNAME" class="capitalize" sortable="" ></Column>
        <Column field="division" header="DIVISION" class="capitalize" sortable="" ></Column>
        <Column field="section" header="SECTION" class="capitalize" sortable="" ></Column>
        <Column header="ACTION" class="w-[10%]" >
            <template #body="{data,index}">
                <div class="flex gap-3" >
                    <div class="grid gap-2 place-content-center" > 
                        <Button v-show="data.softDelete" class="bg-custom-green" icon="pi pi-lock" />
                        <Button v-show="!data.softDelete" class="bg-red-400" icon="pi pi-unlock" />
                    </div>
                    <Button class="bg-slate-500 pi pi-pen-to-square" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
import { ref,computed } from 'vue';
const search = ref('');

const users = ref([
    { id: 1, username: "demo@gmail.com", firstname: "mark", lastname: "tahimik", division: "finance", section: 'accounting', softDelete: false },
    { id: 2,username: "jose01@gmail.com", firstname: "jose", lastname: "namalo", division: "finance", section: 'accounting', softDelete: true },
    { id: 3,username: "pokte@gmail.com", firstname: "pok", lastname: "teh", division: "finance", section: 'accounting', softDelete: false },
]);

const computed_verified = computed(()=>{
    if(search.value != ''){
        return users.value.filter((item)=>{
            return item.username.toLowerCase().includes(search.value.toLowerCase());
        })
    }
    else{
        return users.value;
    }
})
</script>