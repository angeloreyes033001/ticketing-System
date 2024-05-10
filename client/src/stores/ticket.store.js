import { defineStore } from "pinia";
import { GET, PUT, POST } from "@/utils/API/ApiRequest";
export const ticketStore = defineStore('ticket',{
    state: (()=>({
        response: "",
    })),
    actions:{
        async create(data){
            const response = await POST('/tickets/create',data);
            this.response = response;
        },

        async assigned(data){
            const response = await POST('/tickets/assigned',data);
            this.response = response;
        },

        async actionTaken(id){
            const response = await GET(`/tickets/takeAnAction/${id}`);
            this.response = response;
        },
        async updateTakeAction(data){
            const response = await POST('/tickets/update-taken-action',data);
            this.response = response;
        }
    },
    getters:{
        getResponse(state){
            return state.response;
        }
    }
})