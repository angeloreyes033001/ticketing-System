import { defineStore } from "pinia";
import { GET,POST, PUT } from "@/utils/API/ApiRequest";
export const sectionStore = defineStore('section',{
    state:(()=>({
        response: "",
        section: "",
    })),
    actions:{
        async read(){
            const response = await GET('/sections/read');
            this.section = response;
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