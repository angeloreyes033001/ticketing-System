import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
export const divisionStore = defineStore('division',{
    state:(()=>({
        response: "",
        division: "",
    })),
    actions:{
        async read(){
            const response = await GET('/divisions/read');
            this.division = response;
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