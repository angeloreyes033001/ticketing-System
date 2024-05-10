<template>
    <div class=" overflow-hidden h-[90px] p-4 shadow flex items-center relative rounded-[10px] my-5" :class="props.bgColor" >
        <div class="absolute h-[100px] w-[100px] bg-white/40 rounded-[50%] bottom-[-40px] right-[-12px] " ></div>
        <div>
            <div class="font font-bold text-[20px] text-white" >{{ String(total) }}</div>
            <span class="text-white uppercase" >{{ title }}</span>
        </div>
    </div>
</template>
<script setup>
    
    const props = defineProps({
        bgColor: {
            type: String,
            required: 'bg-[#FFBE78]'
        },
        total: {
            type: Number,
            default: 0
        },
        title:{
            type: String,
            default: "Total Pending"
        }
    })

</script>