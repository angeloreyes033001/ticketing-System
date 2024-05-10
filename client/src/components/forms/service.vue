<template>
    <form class="w-full" >
        <div class="my-2" >
            <label>
                <strong class="text-red-400">*</strong>
                Device No.
            </label>
            <InputGroup class="bg-white" >
                <InputText v-model="props.device" placeholder="ex. PJG-COMP-001" />
                <InputGroupAddon>
                    <i class="pi pi-desktop" ></i>
                </InputGroupAddon>
            </InputGroup>
            <small class="text-red-400" >error message</small>
        </div>
        <div class="my-2" >
            <label>
                <strong class="text-red-400">*</strong>
                Description of the problem.
            </label><br/>
            <Textarea v-model="props.problem" autoResize rows="5" cols="30" class="w-full"  />
            <br>
            <small class="text-red-400" >error message</small>
        </div>
        <div class="flex justify-end" >
            <Button type="submit" severity="info" icon="pi pi-send" iconPos="right" label="Send" class="w-[200px]" />
        </div>
    </form>
</template>
<script setup>

const props = defineProps({
    device: {
        type: String,
        default: "",
        required: true,
    },
    problem:{
        type: String,
        default: "",
        required: true
    }
})

</script>