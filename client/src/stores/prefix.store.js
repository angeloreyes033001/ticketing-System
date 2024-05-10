import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
export const prefixStore = defineStore('prefix',{
    state:(()=>({
        response: "",
        prefix: "",
    })),
    actions:{
        async read(){
            const response = await GET('/prefixs/read');
            this.prefix = response;
        }
    },
    getters:{
        getResponse(state){
            return state.response;
        },
        getPrefix(state){
            return state.prefix;
        },
    }
})