<template>
    <div class="border  sm:m-0 p-5 flex items-center bg-white rounded-[10px]" >
        <div class="grid" >
            <h3 class="font-bold text-[18px] uppercase mb-2" >IN PROCESS</h3>
            <div v-for="data in tickets" class="my-3" >
                <div class="grid grid-cols-[150px,1fr]" >
                    <span>Device NO.: </span>
                    <span  class="truncate uppercase " >{{ data.device }}</span>
                </div>
                <div class="grid grid-cols-[150px,1fr]" >
                    <span>Requested Form: </span>
                    <span class="truncate capitalize" >{{ data.form }}</span>
                </div>
                <div class="grid grid-cols-[150px,1fr]" >
                    <span>Problem: </span>
                    <span class="truncate capitalize" >{{ data.problem }}</span>
                </div>
                <div class="grid grid-cols-[150px,1fr]" >
                    <span>Date: </span>
                    <span class="truncate" >{{ data.date }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        title:{
            type:String,
            default: "IN PROCESS TICKET"
        },
        tickets:{
            type: Array,
            required: true
        }
    })
</script>