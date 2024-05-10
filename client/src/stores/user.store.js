import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
export const userStore = defineStore('user',{
    state:(()=>({
        response: "",
        verifiedData: "",
        unverifiedData: "",
        userInfo: ''
    })),
    actions:{

        async info(){
            try {
                const response = await GET('/users/info');
                this.userInfo = response;
            } catch (error) {
                console.error(error)
            }
        },

        async login(data){
            try {
                const response = await POST('/users/login',{...data});
                this.response = response;
            } catch (error) {
                console.error(error)
            }
        },

        async logout(){
            try {
                const response = await GET('/users/logout');
                this.response = response.status;
            } catch (error) {
                console.error(error)
            }
        },

        async createAccount(data){
            const response = await POST('/users/create-account',{...data});
            this.response = response;
        },

        async registrationAccount(data){
            const response = await POST('/users/register',{...data});
            this.response = response;
        },

        async verified(){
            const response = await GET('/users/verified');
            this.verifiedData = response;
        },

        async unverified(){
            const response = await GET('/users/unverified');
            this.unverifiedData = response;
        },

        async verifyAccount(id){
            const response = await PUT(`/users/verify-account/${id}`,{});
            this.response = response;
        },

        async updateStatus(id){
            const response = await PUT(`/users/update-status/${id}`,{});
            this.response = response;
        },

        async readUserWithRole(role='user'){
            const response = await GET(`/users/read-user-base-role/${role}`);
            this.response = response;
        },

        async getTotalUsers(){
            const response = await GET('/users/total-users');
            this.response = response;
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