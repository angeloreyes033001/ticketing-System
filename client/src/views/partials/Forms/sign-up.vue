<template>
    <form @submit.prevent="onSignUp" class="p-10 m-10 w-full " >
        <h5 class=" font-bold text-[20px]" >REGISTRATION</h5>
        <div class="my-3" >
            <InputGroup>
                <InputText placeholder="Username"  :disabled="loading" v-model="credentials.field.username" />
                <InputGroupAddon>
                    <i class="pi pi-user" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.username !=''" class="text-red-300" >{{ credentials.error.username }}</small>
        </div>
        <div class="my-3" >
            <InputGroup>
                <InputText placeholder="Firstname"  :disabled="loading" v-model="credentials.field.firstname"  />
                <InputGroupAddon>
                    <i class="pi pi-user" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.firstname !=''" class="text-red-300" >{{ credentials.error.firstname }}</small>
        </div>
        <div class="my-3" >
            <InputGroup>
                <InputText placeholder="Lastname"  :disabled="loading" v-model="credentials.field.lastname"  />
                <InputGroupAddon>
                    <i class="pi pi-user" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.lastname !=''" class="text-red-300" >{{ credentials.error.lastname }}</small>
        </div>
        <div class="my-3 grid grid-cols-[0.5fr,1fr] gap-5" >
            <div class="e" >
                <!-- <Dropdown v-model="credentials.field.division" class="bg-white w-full" :options="divisionData" optionLabel="division" placeholder="Select a Division" unstyled /> -->
                <select v-model="credentials.field.location.division"  :disabled="loading" class="h-[40px] w-full border" >
                    <option class="" v-for="division in divisionData" :value="division.division_id" >{{ division.name }}</option>
                </select>
                <small v-if="credentials.error.division !=''" class="text-red-300" >{{ credentials.error.section }}</small>
            </div>
            <div class="" >
                <select v-model="credentials.field.location.section"  :disabled="loading" class="h-[40px] w-full border" >
                    <option value="" disabled selected>Select Section</option>
                    <option class="" v-for="section in computed_sections" :value="section.section_id" >{{ section.name }}</option>
                </select>
                <small v-if="credentials.error.section !=''" class="text-red-300" >{{ credentials.error.section }}</small>
            </div>
        </div>
        <div class="my-3" >
            <InputGroup>
                <InputText  @keyup="validateNewPassword"  :disabled="loading" type="password" v-model="credentials.field.password" placeholder="New Password" />
                <InputGroupAddon>
                    <i class="pi pi-eye" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.password !=''" class="text-red-300" >{{ credentials.error.password }}</small>
        </div>
        <div class="my-3" >
            <InputGroup>
                <InputText @keyup="validateConfirmPassword"  :disabled="loading"  type="password" v-model="credentials.field.confirmPassword"  placeholder="Confirm Password" />
                <InputGroupAddon>
                    <i class="pi pi-eye" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.confirmPassword !=''" class="text-red-300" >{{ credentials.error.confirmPassword }}</small>
        </div>
        <Button :loading="loading" :disabled="loading" type="submit" label="SIGN IN" severity="danger" class="w-full" />
        <div class="flex justify-center mt-2" >
            <router-link to="/" >
                <span class="text-center" >You have already account?<strong class="text-green-500" > Sign In</strong></span>
            </router-link>
        </div>
    </form>
</template>
<script setup>
import {reactive,ref,onMounted,computed,inject} from 'vue';
import { isEmpty } from '@/utils/validators/validators.js';
import { divisionStore } from '@/stores/division.store';
import { userStore } from '@/stores/user.store';
import { sectionStore } from '@/stores/section.store';
import { useToast } from 'primevue/usetoast';
const { loading } = inject('useLoading');

const toast = useToast();

const credentials = reactive({
    field:{
        username: '',
        firstname: '',
        lastname: '',
        location: {
            division: "1",
            section: ""
        },
        confirmPassword:'',
        password: ''
    },
    error:{
        username: '',
        firstname: '',
        lastname: '',
        location: {
            division: "",
            section: ""
        },
        confirmPassword:'',
        password: ''
    }
});

const onSignUp = async()=>{
    try {
        removeFieldError();

        if(isEmpty(credentials.field.username )){ return credentials.error.username = "required" }
        if(isEmpty(credentials.field.firstname )){ return credentials.error.firstname = "required" }
        if(isEmpty(credentials.field.lastname )){ return credentials.error.lastname = "required" }
        if(isEmpty(credentials.field.location.division )){ return credentials.error.location.division = "required" }
        if(isEmpty(credentials.field.location.section )){ return credentials.error.location.section = "required" }
        if(isEmpty(credentials.field.password )){ return credentials.error.password = "required" }
        if(isEmpty(credentials.field.confirmPassword )){ return credentials.error.confirmPassword = "required" }
    
        if(credentials.field.password.length < 8){
            return credentials.error.password = "password must be atleast 8 characters." 
        }

        await userStore().registrationAccount({
            username:credentials.field.username,
            firstname:credentials.field.firstname,
            lastname:credentials.field.lastname,
            password: credentials.field.password,
            role: "user",
            section:credentials.field.location.section,
        });

        const response = userStore().getResponse;
        if(response.status){
            removeFieldError();
            resetFieldValue();
            toast.add({ severity: 'success', summary: 'Successfully', detail: 'Successfully registered', life: 2000 });
        }
        else{
            credentials.error.username = response.message;
        }
    } catch (error) {
        console.error(error);
    }
}

const removeFieldError = ()=>{
    credentials.error.username = "";
    credentials.error.firstname = "";
    credentials.error.lastname = "";
    credentials.error.location.division = "";
    credentials.error.location.section = "";
    credentials.error.password = "";
    credentials.error.confirmPassword = "";
}

const resetFieldValue = ()=>{
    credentials.field.username = "";
    credentials.field.firstname = "";
    credentials.field.lastname = "";
    credentials.field.location.division = "1";
    credentials.field.location.section = "";
    credentials.field.password = "";
    credentials.field.confirmPassword = "";
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
        return item.division_id == credentials.field.location.division
    })
});

const validateConfirmPassword = ()=>{
    if(credentials.field.password != ''){
        if(credentials.field.confirmPassword != credentials.field.password){
            return credentials.error.confirmPassword = "Password not match!";
        }else{
            return credentials.error.confirmPassword = "";
        }
    }
}

const validateNewPassword = ()=>{
    if(credentials.field.password == ''){
        credentials.field.confirmPassword = "";
        return credentials.error.confirmPassword = "";
    }
}

onMounted(async()=>{
    await FetchDivision();
    await FetchSection()
})



</script>