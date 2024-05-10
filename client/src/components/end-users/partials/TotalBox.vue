<template>
    <div class="border p-5 flex items-center rounded-[10px] relative overflow-hidden" :class="bgColor" >
        <div class="h-[130px] w-[130px] bg-white/50 absolute bottom-[-50px] right-[-30px] rounded-[50%] " ></div>
        <div class="grid grid-cols-[50px,1fr] md:grid-cols-[100px,1fr]" >
            <div class="grid place-content-center" >
                <i class="text-[30px] text-white" :class="icon" ></i>
            </div>
            <div class="" >
                <h1 class="text-white text-[25px]" >{{ props.total }}</h1>
                <strong class="text-white uppercase text-[14px]">{{ props.label }}</strong>
            </div>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
        label:{
            type:String,
            default: "IN PROCESS TICKET"
        },
        total: {
            type: String,
            default: 0,
        },
        bgColor: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'pi pi-spinner'
        }
    })

</script>