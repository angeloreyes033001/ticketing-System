<template>
    <div class="flex justify-end my-3 mt-5" v-if="route.path != '/admin/dashboard/account' " >
        <Button @click="modalADD = true" :loading="loading" :disabled="loading" class="sm:w-[300px] font-light" icon="pi pi-user-plus" label=" ADD ACCOUNT" />
    </div>
    <TabMenu :model="items" class="">
        <template #item="{ item, props }">
            <router-link :to="item.route" >
                <div class="grid gap-2" v-bind="props.action">
                    <span class="text-center text-[18px]" v-bind="props.icon" />
                    <small class="text-[14px] font-light" ><span v-bind="props.label">{{ item.label }}</span></small>
                </div>
            </router-link>
        </template>
    </TabMenu>
    <div class="py-5" >
        <RouterView/>
    </div>
    <Dialog v-model:visible="modalADD" modal class="bg-white w-[90vw] md:max-w-[500px]" >
        <template #header >
            <span>ADD ACCOUNT</span>
        </template>
        <form @submit.prevent="onCreateAccount" class="p-3" >
            <div class="grid my-2" >
                <label for="">Username</label>
                <InputText v-model="userField.field.username" :disabled="loading" />
                <small class="text-red-400" v-if="userField.error.username !=''" >{{ userField.error.username }}</small>
            </div>
            <div class="grid my-2" >
                <label for="">Firstname</label>
                <InputText v-model="userField.field.firstname" :disabled="loading" />
                <small class="text-red-400" v-if="userField.error.firstname !=''" >{{ userField.error.firstname }}</small>
            </div>
            <div class="grid my-2" >
                <label for="">Lastname</label>
                <InputText v-model="userField.field.lastname" :disabled="loading" />
                <small class="text-red-400" v-if="userField.error.lastname !=''" >{{ userField.error.lastname }}</small>
            </div>
            <div class="my-2" >
                <label for="">Location</label>
                <div class="grid grid-cols-[150px,1fr] gap-3" >
                    <div class="grid" >
                        <!-- <Dropdown v-model="userField.field.location.division" :options="divisions" optionLabel="name" optionValue="division_id" /> -->
                        <select class="border h-[50px]" :disabled="loading" v-model="userField.field.location.division" >
                            <option v-for="data in divisions" :value="data.division_id" >{{ data.name }}</option>
                        </select>
                    </div>
                    <div class="grid" >
                        <select class="border h-[50px]" :disabled="loading" v-model="userField.field.location.section"  >
                            <option value="" >Select Section</option>
                            <option v-for="data in computed_sections" :value="data.section_id" >{{ data.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="grid my-2" >
                <label for="">New Password</label>
                <InputText type="password" v-model="userField.field.newPassword" :disabled="loading" @keyup="validateNewPassword" />
                <small class="text-red-400" v-if="userField.error.newPassword !=''" >{{ userField.error.newPassword }}</small>
            </div>
            <div class="grid my-2" >
                <label for="">Confirm Password</label>
                <InputText type="password" v-model="userField.field.confirmPassword" :disabled="loading" @keyup="validateConfirmPassword" />
                <small class="text-red-400" v-if="userField.error.confirmPassword !=''" >{{ userField.error.confirmPassword }}</small>
            </div>
            <div class="grid my-2" >
                <label for="">Role</label>
                <select v-model="userField.field.role" :disabled="loading" class="border h-[50px] capitalize " >
                    <option v-for="role in roles" :value="role.value" class="capitalize" >{{ role.value }}</option>
                </select>
                <small class="text-red-400" v-if="userField.error.role !=''" >{{ userField.error.role }}</small>
            </div>
            <div clas="mt-2" >
                <Button :loading="loading" :disabled="loading" type="submit" class="w-full" icon="pi pi-save" label="SAVE" />
            </div>
        </form>
    </Dialog>
</template>
<script setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import {useRoute} from 'vue-router';
import { userStore } from '@/stores/user.store';
import { divisionStore } from '@/stores/division.store';
import { isEmpty } from '@/utils/validators/validators.js';
import { useToast } from 'primevue/usetoast';
const { loading } = inject('useLoading');
const toast = useToast();
const modalADD = ref(false)

const route = useRoute()

const items = ref([
        { label: 'Unverify', icon: 'pi pi-users', route: "/root/dashboard/account" },
        { label: 'Verified', icon: 'pi pi-user', route: "/root/dashboard/account/verified" },
]);


const userField = reactive({
    field:{
        username: "",
        firstname: "",
        lastname: "",
        location: {
            division: "1",
            section: ""
        },
        confirmPassword: "",
        newPassword: "",
        role: "user"
    },
    error:{
        username: "",
        firstname: "",
        lastname: "",
        location: {
            division: "",
            section: ""
        },
        confirmPassword: "",
        newPassword: "",
        role: ""
    }
})

const roles = ref([
    { value: "root", label: "Admin" },
    { value: "helpdesk", label: "Helpdesk" },
    { value: "technical_support", label: "Technical Support" },
    { value: "user", label: "User" }
]);

const divisions = ref(inject("GlobalDivisionData"));

const sections = ref(inject("GlobalSectionData"));

const computed_sections = computed(()=>{
    return sections.value.filter((item)=>{
        return item.division_id == userField.field.location.division
    })
});

const onCreateAccount = async()=>{
    try {
        removeFieldError();

        if(isEmpty(userField.field.username )){ return userField.error.username = "required" }
        if(isEmpty(userField.field.firstname )){ return userField.error.firstname = "required" }
        if(isEmpty(userField.field.lastname )){ return userField.error.lastname = "required" }
        if(isEmpty(userField.field.location.division )){ return userField.error.location.division = "required" }
        if(isEmpty(userField.field.location.section )){ return userField.error.location.section = "required" }
        if(isEmpty(userField.field.newPassword )){ return userField.error.newPassword = "required" }
        if(isEmpty(userField.field.confirmPassword )){ return userField.error.confirmPassword = "required" }
        if(isEmpty(userField.field.role )){ return userField.error.role = "required" }

        if(userField.field.newPassword.length < 8){
            return userField.error.newPassword = "password must be atleast 8 characters." 
        }

        await userStore().createAccount({
            username:userField.field.username,
            firstname:userField.field.firstname,
            lastname:userField.field.lastname,
            password: userField.field.newPassword,
            role: userField.field.role,
            section:userField.field.location.section,
        });

        const response = userStore().getResponse;
        if(response.status){
            removeFieldError();
            resetFieldValue();
            modalADD.value = false;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Successfully registered', life: 2000 });
        }
        else{
            userField.error.username = response.message;
        }
    } catch (error) {
        console.error(error);
    }
}

const validateConfirmPassword = ()=>{
    if(userField.field.newPassword != ''){
        if(userField.field.confirmPassword != userField.field.newPassword){
            return userField.error.confirmPassword = "Password not match!";
        }else{
            return userField.error.confirmPassword = "";
        }
    }
}

const validateNewPassword = ()=>{
    if(userField.field.newPassword == ''){
        userField.field.confirmPassword = "";
        return userField.error.confirmPassword = "";
    }
}

const removeFieldError = ()=>{
    userField.error.username = "";
    userField.error.firstname = "";
    userField.error.lastname = "";
    userField.error.location.division = "";
    userField.error.location.section = "";
    userField.error.newPassword = "";
    userField.error.confirmPassword = "";
    userField.error.role = "";
}

const resetFieldValue = ()=>{
    userField.field.username = "";
    userField.field.firstname = "";
    userField.field.lastname = "";
    userField.field.location.division = "1";
    userField.field.location.section = "";
    userField.field.newPassword = "";
    userField.field.confirmPassword = "";
    userField.field.role = "user";
}

onMounted(async()=>{
    divisions.value = await divisionStore().getDivision
})

</script>