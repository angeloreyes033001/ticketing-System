import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
import { loading } from '@/utils/useLoading';

export const prefixStore = defineStore('prefix',{
    state:(()=>({
        response: "",
        prefix: "",
    })),
    actions:{
        async read(){
            loading.value = !loading.value;
            const response = await GET('/prefixs/read');
            this.prefix = response;
            loading.value = !loading.value;
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