import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
import { loading } from '@/utils/useLoading';

export const divisionStore = defineStore('division',{
    state:(()=>({
        response: "",
        division: "",
    })),
    actions:{
        async read(){
            loading.value = !loading.value;
            const response = await GET('/divisions/read');
            this.division = response;
            loading.value = !loading.value;
        }
    },
    getters:{
        getResponse(state){
            return state.response;
        },
        async getDivision(state){
            return state.division;
        },
    }
})