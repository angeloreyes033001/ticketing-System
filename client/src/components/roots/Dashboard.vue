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
                    <span class="capitalize" >{{time}}&nbsp;</span>
                </div>
                <div class="flex items-center" >
                    <div @click="logoutAccount" class="h-[40px] w-[40px] hover:bg-slate-100 hover:shadow rounded-[50%] grid place-content-center" >
                        <i class="pi pi-sign-out" ></i>
                    </div>
                </div>
            </div>
            <RouterView/>
        </div>
    </main>
</template>
<script setup>
import { onMounted, provide, ref } from 'vue';
import { divisionStore } from '@/stores/division.store';
import { userStore } from '@/stores/user.store';
import { sectionStore } from '@/stores/section.store';
import {useRoute,useRouter} from 'vue-router';
import { useDateFormat,useNow } from '@vueuse/core';
const time = useDateFormat(useNow(),'ddd, h:m:ss AA');

const route = useRoute();
const router = useRouter();

const lists = ref([
    {
        label: "Dashboard",
        icon: 'pi pi-objects-column',
        to:['/root/dashboard']
    },
    {
        label: "Accounts",
        icon: 'pi pi-users',
        to:['/root/dashboard/account','/root/dashboard/account/verified',"/root/dashboard/account/technical-support"]
    },
]);

const logoutAccount =async ()=>{
    try {
        await userStore().logout();
        const response = userStore().getResponse;
        if(response){
            router.push('/')
        }
    } catch (error) {
        console.error(error)
    }
}


const GlobalDivisionData = ref([])
const FetchDivision = async ()=>{
    try {
        await divisionStore().read();
        GlobalDivisionData.value = await divisionStore().getDivision;
    } catch (error) {
        console.error(error);
    }
}

const GlobalSectionData = ref([])
const FetchSection = async ()=>{
    try {
        await sectionStore().read();
        GlobalSectionData.value = await sectionStore().getSection;
    } catch (error) {
        console.error(error);
    }
}

provide('GlobalDivisionData',GlobalDivisionData)
provide('GlobalSectionData',GlobalSectionData)

onMounted(async()=>{
    await FetchDivision();
    await FetchSection()
})

</script>