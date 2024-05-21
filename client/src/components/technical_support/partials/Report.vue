<template>
    <div>
        <div class="flex items-center gap-5 p-5 border-2 border-white border-b-slate-300" >
            <router-link v-for="tab in listTabs" :to="tab.to" class="flex align-items-center gap-2 p-3 rounded-[10px] " :class="{'bg-custom-green-v2 text-white font-semibold': tab.to == route.path }">
                <div class="grid place-content-center" >
                    <i :class="tab.icon" ></i>
                </div>
                <span class=" white-space-nowrap uppercase" :class="{'font-semibold': tab.to == route.path ,'font-light': tab.to != route.path  }" >{{ tab.label }}</span>
            </router-link>
        </div>
        <div class="mt-10" >
            <RouterView/>
        </div>
    </div>
</template>
<script setup>

import { ref } from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();

const listTabs = ref([
    {
        label: 'in process',
        icon: "pi pi-wrench",
        to: "/technical-support/dashboard/report"
    },
    {
        label: 'completed',
        icon: "pi pi-check",
        to: "/technical-support/dashboard/report/completed"
    },
]);

</script>