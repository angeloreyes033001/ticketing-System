<template>
    <main class="h-screen grid grid-cols-[250px,1fr] lg:grid-cols-[350px,1fr]" >
        <div class="bg-custom-green-v2" >
            <div class="h-[80px] flex items-center justify-between px-5 lg:px-10" >
                <span class="text-white font-semibold" >TICKETING SYSTEM</span>
                <i class="pi pi-bars cursor-pointer text-white" ></i>
            </div>
            <router-link v-for="list in lists" :to="list.to[0]" class="h-[50px] grid grid-cols-[50px,1fr] gap-3 px-5 my-2 font-light" >
                <div class="h-full w-full rounded-[50%] grid place-content-center" :class="{'bg-white text-black/50': list.to.includes(route.path) , 'text-white': !list.to.includes(route.path)}">
                    <i :class="list.icon" ></i>
                </div>
                <div class="w-full h-full rounded-[30px] flex items-center pl-5" :class="{'bg-white text-black/50': list.to.includes(route.path) , 'text-white':  !list.to.includes(route.path)}" >
                    <span>{{ list.label }}</span>
                </div>
            </router-link>
        </div>
        <div class="overflow-auto px-5 lg:px-10 select-none" >
            <div class="h-[60px] flex justify-end sticky top-0 z-50 bg-white gap-2 font-light text-[16px]" >
                <div class="flex items-center" >
                    <span class="capitalize" >Fri, 10:00 AM&nbsp;</span>
                </div>
                <div class="flex items-center" >
                    <div class="h-[40px] w-[40px] hover:bg-slate-100 hover:shadow rounded-[50%] grid place-content-center" >
                        <i class="pi pi-cog" ></i>
                    </div>
                </div>
                <div class="flex items-center" >
                    <div class="h-[40px] w-[40px] hover:bg-slate-100 hover:shadow rounded-[50%] grid place-content-center" >
                        <i class="pi pi-user" ></i>
                    </div>
                </div>
            </div>
            <RouterView/>
        </div>
    </main>
</template>
<script setup>
import { ref } from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const lists = ref([
    {
        label: "Tickets",
        icon: 'pi pi-ticket',
        to: ['/technical-support/dashboard']
    },
    {
        label: "Reports",
        icon: 'pi pi-chart-bar',
        to: [
            '/technical-support/dashboard/report',
            '/technical-support/dashboard/report/completed',
            '/technical-support/dashboard/report/condemnend'
        ]
    },
])

</script>