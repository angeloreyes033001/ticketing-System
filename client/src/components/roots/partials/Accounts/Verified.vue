<template>
    <DataTable :value="computed_verified" paginator :rows="10" :rowsPerPageOptions="[10, 20,50]" stripedRows removableSort  showGridlines  >
        <template #header >
            <div class="flex justify-between" >
                <div class="flex items-end gap-5" >
                    <div class="flex gap-2" >
                        <i class="pi pi-circle-fill text-custom-green" ></i>
                        <span class="uppercase" >Active</span>
                    </div>
                    <div class="flex gap-2" >
                        <i class="pi pi-circle-fill text-red-400" ></i>
                        <span class="uppercase" >Deactive</span>
                    </div>
                </div>
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
        <Column field="role" header="ROLE" class="capitalize" sortable="" ></Column>
        <Column header="ACTION" class="w-[10%]" >
            <template #body="{data,index}">
                <div class="flex gap-3" >
                    <div class="grid gap-2 place-content-center" > 
                        <Button v-show="data.status" @click="updateStatusAccount(data.user_id)" class="bg-red-400" icon="pi pi-unlock" />
                        <Button v-show="!data.status" @click="updateStatusAccount(data.user_id)" class="bg-custom-green" icon="pi pi-lock" />
                    </div>
                    <Button class="bg-slate-500 pi pi-cog" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>
<script setup>
import { ref,computed, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { userStore } from '@/stores/user.store';
const toast = useToast();
const search = ref('');

const users = ref([]);
const verfiedUsers = async()=>{
    try {
        await userStore().verified();
        users.value = userStore().getVerifiedUsers;
        console.log(userStore().getVerifiedUsers)
    } catch (error) {
        console.error(error);
    }
}

const computed_verified = computed(()=>{
    if(search.value != ''){
        return users.value.filter((item)=>{
            return item.username.toLowerCase().includes(search.value.toLowerCase());
        })
    }
    else{
        return users.value;
    }
});

const updateStatusAccount = async(id)=>{
    try {
        await userStore().updateStatus(id);
        const response = userStore().getResponse;
        if(response.status){
            await verfiedUsers();
            toast.add({severity:'success', summary: "Success" ,detail: response.message ,life: 2000})
        }
    } catch (error) {
        console.error(error)
    }
}


onMounted(async()=>{
    await verfiedUsers();
})
</script>