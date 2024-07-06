import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
import { loading } from '@/utils/useLoading';
export const userStore = defineStore('user',{
    state:(()=>({
        response: "",
        verifiedData: "",
        unverifiedData: "",
        userInfo: ''
    })),
    actions:{

        async info(){
            loading.value = !loading.value;
            try {
                const response = await GET('/users/info');
                this.userInfo = response;
            } catch (error) {
                console.error(error)
            }
            loading.value = !loading.value;
        },

        async login(data){
            loading.value = !loading.value;
            try {
                const response = await POST('/users/login',{...data});
                this.response = response;
            } catch (error) {
                console.error(error)
            }
            loading.value = !loading.value;
        },

        async logout(){
            loading.value = !loading.value;
            try {
                const response = await GET('/users/logout');
                this.response = response.status;
            } catch (error) {
                console.error(error)
            }
            loading.value = !loading.value;
        },

        async createAccount(data){
            loading.value = !loading.value;
            const response = await POST('/users/create-account',{...data});
            this.response = response;
            loading.value = !loading.value;
        },

        async registrationAccount(data){
            loading.value = !loading.value;
            const response = await POST('/users/register',{...data});
            this.response = response;
            loading.value = !loading.value;
        },

        async verified(){
            loading.value = !loading.value;
            const response = await GET('/users/verified');
            this.verifiedData = response;
            loading.value = !loading.value;
        },

        async unverified(){
            loading.value = !loading.value;
            const response = await GET('/users/unverified');
            this.unverifiedData = response;
            loading.value = !loading.value;
        },

        async verifyAccount(id){
            loading.value = !loading.value;
            const response = await PUT(`/users/verify-account/${id}`,{});
            this.response = response;
            loading.value = !loading.value;
        },

        async updateStatus(id){
            loading.value = !loading.value;
            const response = await PUT(`/users/update-status/${id}`,{});
            this.response = response;
            loading.value = !loading.value;
        },

        async readUserWithRole(role='user'){
            loading.value = !loading.value;
            const response = await GET(`/users/read-user-base-role/${role}`);
            this.response = response;
            loading.value = !loading.value;
        },

        async getTotalUsers(){
            loading.value = !loading.value;
            const response = await GET('/users/total-users');
            this.response = response;
            loading.value = !loading.value;
        },
    },
    getters:{
        getResponse(state){
            return state.response;
        },
        getVerifiedUsers(state){
            return state.verifiedData;
        },
        getUnVerifiedUsers(state){
            return state.unverifiedData;
        },
        getUserInfo(state){
            return state.userInfo;
        }
    }
})