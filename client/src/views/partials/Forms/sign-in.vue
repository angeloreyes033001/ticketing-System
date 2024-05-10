<template>
    <form @submit.prevent="onLogin" class=" sm:p-10 m-10 w-full " >
        <div class="grid justify-center" >
            <img src="@/assets/logo/imiss.png" class="h-[140px] w-[140px] sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px]  " />
        </div>
        <h5 class="text-center font-bold text-[18px] sm:text-[20px] md:text-[30px]" >TICKETING SYSTEM</h5>
        <div class="my-3" >
            <InputGroup>
                <InputText v-model="credentials.field.username"  placeholder="Username" />
                <InputGroupAddon>
                    <i class="pi pi-user" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.username !=''" class="text-red-300" >{{ credentials.error.username }}</small>
        </div>
        <div class="my-3" >
            <InputGroup>
                <InputText v-model="credentials.field.password" type="password" placeholder="Password" />
                <InputGroupAddon>
                    <i class="pi pi-eye" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small v-if="credentials.error.password !=''" class="text-red-300" >{{ credentials.error.password }}</small>
        </div>
        <Button type="submit" label="Sign In" severity="success" class="w-full" />
        <div class="flex justify-center mt-2" >
            <router-link to="/registration" >
                <span class="text-center" >You don't have account?<strong class="text-red-500" > Sign Up</strong></span>
            </router-link>
        </div>
    </form>
</template>
<script setup>
import {reactive} from 'vue';
import { userStore } from '@/stores/user.store';
import { isEmpty } from '@/utils/validators/validators.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const credentials = reactive({
    field:{
        username: '',
        password: ''
    },
    error:{
        username: '',
        password: ''
    }
});

const onLogin =async()=>{
    try {
        const { username, password } = credentials.field;

        if(isEmpty(username)){ return credentials.error.username = "required field." }
        if(isEmpty(password)){ return credentials.error.password = "required field." }

        await userStore().login({username:username,password:password});
        const response = userStore().getResponse;
        
        if(response.status){
            if(response.role == "root"){
                router.push('/root/dashboard')
            }
            if(response.role == "helpdesk"){
                router.push('/helpdesk/dashboard')
            }

            if(response.role == "technical_support"){
                router.push('/technical-support/dashboard')
            }

            if(response.role == "user"){
                router.push('/dashboard')
            }
        }
        else{
            if(response.error == "username"){
                return credentials.error.username = response.message;
            }

            if(response.error == "password"){
                return credentials.error.password = response.message;
            }
        }

    } catch (error) {
        console.error(error);
    }
}

</script>