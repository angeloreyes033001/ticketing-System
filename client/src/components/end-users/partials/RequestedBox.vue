<template>
    <div class="border  sm:m-0 p-5 flex items-center bg-white rounded-[10px]" >
        <div class="grid" >
            <h3 class="font-bold text-[18px] uppercase mb-2" >{{ props.title }}</h3>
            <div class="grid grid-cols-[150px,1fr]" >
                <span>Device NO.: </span>
                <span  class="truncate uppercase " >{{ props.device }}</span>
            </div>
            <div class="grid grid-cols-[150px,1fr]" >
                <span>Requested Form: </span>
                <span class="truncate capitalize" >{{ props.form }}</span>
            </div>
            <div class="grid grid-cols-[150px,1fr]" >
                <span>Problem: </span>
                <span class="truncate capitalize" >{{ props.problem }}</span>
            </div>
            <div class="grid grid-cols-[150px,1fr]" >
                <span>Date {{props.dateLabel}}: </span>
                <span class="truncate" >{{ props.started }}</span>
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
        device: {
            type: String,
            default: 0,
            required: true
        },
        form:{
            type:String,
            default: "service",
            requried: true
        },
        problem:{
            type:String,
            required: true
        },
        started:{
            type:String,
            required:true
        },
        dateLabel: {
            type: String,
            default: "started"
        }
    })
</script>