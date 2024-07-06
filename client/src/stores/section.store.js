import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
import { loading } from '@/utils/useLoading';
export const sectionStore = defineStore('section',{
    state:(()=>({
        response: "",
        section: "",
    })),
    actions:{
        async read(){
            loading.value = !loading.value;
            const response = await GET('/sections/read');
            this.section = response;
            loading.value = !loading.value;
        }
    },
    getters:{
        getResponse(state){
            return state.response;
        },
        async getSection(state){
            return state.section;
        },
    }
})