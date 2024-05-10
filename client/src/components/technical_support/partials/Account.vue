<template>
    <div class="" >
        <div class="flex items-center gap-5 p-5 border-2 border-white border-b-slate-300" >
            <router-link v-for="tab in listTabs" :to="tab.to" class="flex align-items-center gap-2 p-3 rounded-[10px] " :class="{'bg-custom-green-v2 text-white font-semibold': tab.to == route.path }">
                <div class="grid place-content-center" >
                    <i :class="tab.icon" ></i>
                </div>
                <span class=" white-space-nowrap uppercase" :class="{'font-semibold': tab.to == route.path ,'font-light': tab.to != route.path  }" >{{ tab.label }}</span>
            </router-link>
        </div>
        <div class="mt-10" >
            <div class="flex justify-end my-3" v-if="route.path != '/admin/dashboard/account' " >
                <Button class="bg-custom-blue w-full sm:w-[300px] pi pi-user-plus" label=" ADD ACCOUNT" />
            </div>
            <RouterView/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute()

const listTabs = ref([
    {
        label: 'unverified',
        icon: "pi pi-user-plus",
        to: "/technical-support/dashboard/account"
    },
    {
        label: 'verified',
        icon: "pi pi-users",
        to: "/technical-support/dashboard/account/verified"
    },
    {
        label: 'Co-Admin',
        icon: "pi pi-user",
        to: "/technical-support/dashboard/account/co-admin"
    }
]);

</script>