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
                        <InputText v-model="search"  :disable="loading" type="text" placeholder="Search..." class="w-full font-light" />
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
                        <Button :loading="loading" :disable="loading" v-show="data.status" @click="updateStatusAccount(data.user_id)" severity="danger" class="" icon="pi pi-unlock" />
                        <Button :loading="loading" :disable="loading" v-show="!data.status" @click="updateStatusAccount(data.user_id)" class="" icon="pi pi-lock" />
                    </div>
                    <Button @click="selectUserForSetting(data.user_id)" :loading="loading" :disable="loading" severity="secondary" icon="pi pi-cog" />
                </div>
            </template>
        </Column>
    </DataTable>
    <Dialog  v-model:visible="settingModal"  modal  class="p-5 bg-white max-w-[600px]" >
        <template #header >
            <span></span>
        </template>
        <div>
            <div class="" >
                <Accordion :activeIndex="0">
                    <AccordionTab header="Personal Information">
                        <form>
                            <div class="mt-2" >
                                <label>Firstname</label>
                                <InputGroup>
                                    <InputText :disable="loading" v-model="selectedIDSetting.data.firstname" />
                                    <InputGroupAddon>
                                        <i class="pi pi-user" ></i>
                                    </InputGroupAddon>
                                </InputGroup>
                                <small class="text-red-400" >Error message</small>
                            </div>
                            <div class="mt-2" >
                                <label>Lastname</label>
                                <InputGroup>
                                    <InputText  :disable="loading" v-model="selectedIDSetting.data.lastname" />
                                    <InputGroupAddon>
                                        <i class="pi pi-user" ></i>
                                    </InputGroupAddon>
                                </InputGroup>
                                <small class="text-red-400" >Error message</small>
                            </div>
                            <div class="mt-2 flex justify-end" >
                                <Button type="submit" :loading="loading"  :disable="loading" label="Update" class="bg-blue-400 w-[200px]" icon="pi pi-save" />
                            </div>
                        </form>
                    </AccordionTab>
                    <AccordionTab header="Division and Section">
                        <form>
                            <div class="grid mt-2" >
                                <label for="">Division</label>
                                <select v-model="selectedIDSetting.data.division_id"  :disable="loading" class="h-[40px] border outline-none" >
                                    <option v-for="data in divisionData" :value="data.division_id" class="capitalize" >{{ data.name }}</option>
                                </select>
                            </div>
                            <div class="grid mt-2" >
                                <label for="">Section</label>
                                <select v-model="selectedIDSetting.data.section_id" :disable="loading" class="h-[40px] border outline-none" >
                                    <option value="" >Select Section</option>
                                    <option v-for="data in computed_sections" :value="data.section_id" class="capitalize" >{{ data.name }}</option>
                                </select>
                            </div>
                            <div class="mt-2 flex justify-end" >
                                <Button type="submit" label="Update" :loading="loading" :disable="loading" class="bg-blue-400 w-[200px]"  icon="pi pi-save"  />
                            </div>
                        </form>
                    </AccordionTab>
                    <AccordionTab header="Change Password">
                        <form>
                            <div class="mt-2" >
                                <label>New Password</label>
                                <InputGroup>
                                    <InputText type="password"  :disable="loading" placeholder="New Password" />
                                    <InputGroupAddon>
                                        <i class="pi pi-lock" ></i>
                                    </InputGroupAddon>
                                </InputGroup>
                                <small class="text-red-400" >Error message</small>
                            </div>
                            <div class="mt-2" >
                                <label>Confirm Password</label>
                                <InputGroup>
                                    <InputText type="password"  :disable="loading" placeholder="Confirm Password" />
                                    <InputGroupAddon>
                                        <i class="pi pi-lock" ></i>
                                    </InputGroupAddon>
                                </InputGroup>
                                <small class="text-red-400" >Error message</small>
                            </div>
                            <div class="mt-2 flex justify-end" >
                                <Button type="submit" label="Update" :loading="loading"  :disable="loading" class="bg-blue-400 w-[200px]"  icon="pi pi-save"  />
                            </div>
                        </form>
                    </AccordionTab>
                </Accordion>
            </div>
        </div>
    </Dialog>
</template>
<script setup>
import { ref,computed, onMounted, inject } from 'vue';
import { useToast } from 'primevue/usetoast';
import { userStore } from '@/stores/user.store';
import { reactive } from 'vue';
import { divisionStore } from '@/stores/division.store';
import { sectionStore } from '@/stores/section.store';
const { loading } = inject('useLoading');
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

const updateStatusAccount = async(user_id)=>{
    try {
        await userStore().updateStatus(user_id);
        const response = userStore().getResponse;
        if(response.status){
            await verfiedUsers();
            toast.add({severity:'success', summary: "Success" ,detail: response.message ,life: 2000})
        }
    } catch (error) {
        console.error(error)
    }
}

const selectedIDSetting = reactive({
    data:{
        firstname: "",
        lastname: "",
        division_id: "",
        section_id: ""
    },
    errors:{
        firstname: "",
        lastname: "",
        division_id: "",
        section_id: ""
    }
});
const settingModal = ref(false);
const selectUserForSetting=(user_id)=>{
    settingModal.value = true;
    let user = users.value.find((item)=>{ return item.user_id == user_id});
    selectedIDSetting.data.firstname = user.firstname;
    selectedIDSetting.data.lastname = user.lastname;
    selectedIDSetting.data.division_id = user.division_id;
    selectedIDSetting.data.section_id = user.section_id;
}

const divisionData = ref([])
const FetchDivision = async ()=>{
    try {
        await divisionStore().read();
        divisionData.value = await divisionStore().getDivision;
    } catch (error) {
        console.error(error);
    }
}

const sectionData = ref([])
const FetchSection = async ()=>{
    try {
        await sectionStore().read();
        sectionData.value = await sectionStore().getSection;
    } catch (error) {
        console.error(error);
    }
}

const computed_sections = computed(()=>{
    return sectionData.value.filter((item)=>{
        return item.division_id == selectedIDSetting.data.division_id
    })
});


onMounted(async()=>{
    await verfiedUsers();
    await FetchDivision();
    await FetchSection();
})
</script>