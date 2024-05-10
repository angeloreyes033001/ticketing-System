<template>
    <DataTable :value="computed_users" paginator :rows="10" :rowsPerPageOptions="[10, 20,50]" stripedRows removableSort  showGridlines >
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
        <Column field="username" header="USERNAME" sortable ></Column>
        <Column field="firstname" header="FIRSTNAME" class="capitalize" sortable ></Column>
        <Column field="lastname" header="LASTNAME" class="capitalize" sortable ></Column>
        <Column field="division" header="DIVISION" class="capitalize" sortable ></Column>
        <Column field="section" header="SECTION" class="capitalize" sortable ></Column>
        <Column field="role" header="ROLE" class="capitalize" sortable ></Column>
        <Column header="APPROVE" >
            <template #body="{data,index}">
                <Button @click="verifyAccount(data.user_id)" class="bg-custom-green" icon="pi pi-check" />
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
import { ref,computed, onMounted } from 'vue';
import { userStore } from '@/stores/user.store';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const search = ref('');

const users = ref([]);
const unVerfiedUsers = async()=>{
    try {
        await userStore().unverified();
        users.value = userStore().getUnVerifiedUsers;
    } catch (error) {
        console.error(error);
    }
}

const computed_users = computed(()=>{
    if(search.value != ''){
        return users.value.filter((item)=>{
            return item.username.toLowerCase().includes(search.value.toLowerCase());
        })
    }
    else{
        return users.value;
    }
})

const verifyAccount = async(id)=>{
    try {
        await userStore().verifyAccount(id);
        const response = userStore().getResponse;
        if(response.status){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Verify Account!', life: 2000 });
            await unVerfiedUsers();
        }
    } catch (error) {
        console.error(error)
    }
}

onMounted(async()=>{
    await unVerfiedUsers();
})


</script>