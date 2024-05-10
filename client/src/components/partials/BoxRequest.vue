<template>
    <Card class="h-full bg-slate-100 text-black/70 " >
        <template #subtitle class=" ">
            <span class=" uppercase font-bold" >{{props.title}}</span>
        </template>
        <template #content>
            <div class="grid grid-cols-[150px,1fr] h-[30px]" >
                <strong>Device No.:</strong>
                <span class="truncate" :title="props.device" >{{ props.device }}</span></div>
            <div class="grid grid-cols-[150px,1fr] h-[30px]" >
                <strong>Requested Form:</strong>
                <span class="truncate" :title="props.request"  >{{ props.request }}</span>
            </div>
            <div class="grid grid-cols-[150px,1fr] h-[30px]" >
                <strong>Decription:</strong>
                <span class="truncate" :title="props.description" >{{ props.description }}</span>
            </div>
            <div class="grid grid-cols-[150px,1fr] h-[30px]" >
                <strong>Date Start:</strong>
                <span class="truncate" :title="props.date" >{{ props.date }}</span>
            </div>
        </template>
    </Card>
</template>
<script setup>

const props = defineProps({
    title: '',
    device: '',
    request: '',
    description: '',
    date: '',
})

</script>