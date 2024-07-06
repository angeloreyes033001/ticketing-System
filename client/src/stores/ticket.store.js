import { defineStore } from "pinia";
import { GET, PUT, POST } from "@/utils/API/ApiRequest";
import { loading } from '@/utils/useLoading';
export const ticketStore = defineStore('ticket',{
    state: (()=>({
        response: "",
    })),
    actions:{
        async create(data){
            loading.value = !loading.value;
            const response = await POST('/tickets/create',data);
            this.response = response;
            loading.value = !loading.value;
        },

        async assigned(data){
            loading.value = !loading.value;
            const response = await POST('/tickets/assigned',data);
            this.response = response;
            loading.value = !loading.value;
        },

        async actionTaken(id){
            loading.value = !loading.value;
            const response = await GET(`/tickets/takeAnAction/${id}`);
            this.response = response;
            loading.value = !loading.value;
        },
        async updateTakeAction(data){
            loading.value = !loading.value;
            const response = await POST('/tickets/update-taken-action',data);
            this.response = response;
            loading.value = !loading.value;
        },
        async getTotalCompleted(){
            loading.value = !loading.value;
            const response = await GET('/tickets/total-completed');
            this.response = response;
            loading.value = !loading.value;
        },
        async getTotalPending(){
            loading.value = !loading.value;
            const response = await GET('/tickets/total-pending');
            this.response = response;
            loading.value = !loading.value;
        },
        async getTotalInProcess(){
            loading.value = !loading.value;
            const response = await GET('/tickets/total-in-process');
            this.response = response;
            loading.value = !loading.value;
        },
    },
    getters:{
        getResponse(state){
            return state.response;
        }
    }
})