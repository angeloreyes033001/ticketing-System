<template>
    <DataTable :value="computed_completed" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" removableSort showGridlines >
        <template #header >
            <div class="flex justify-between" >
                <div></div>
                <div>
                    <InputGroup>
                        <InputText v-model="search" type="text" placeholder="Search.." class="font-light" />
                        <InputGroupAddon>
                            <i class="pi pi-search" ></i>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
        </template>
        <template #empty>
            <div class="text-center" >NO DATA FOUND</div>
        </template>
        <Column field="ticketID" sortable header="TICKET ID" ></Column>
        <Column field="firstname" sortable header="FIRSTNAME" class="capitalize" ></Column>
        <Column field="lastname" sortable header="LASTNAME" class="capitalize" ></Column>
        <Column field="device" sortable header="DEVICENO" class="uppercase" ></Column>
        <Column field="division" sortable header="DIVISION" class="capitalize" ></Column>
        <Column field="section" sortable header="SECTION" class="capitalize" ></Column>
        <Column field="received" sortable header="RECEIVED" ></Column>
        <Column field="started" sortable header="STARTED" ></Column>
        <Column field="finished" sortable header="FINISHED" ></Column>
        <Column field="conducted" header="CONDUCTED" class="capitalize" ></Column>
        <Column header="ACTION" >
            <template #body="{data,index}" >
                <Button @click="visible =true" class="bg-custom-blue pi pi-expand"/>
            </template>
        </Column>
    </DataTable>
    <Dialog  v-model:visible="visible" modal class="bg-white" >
        <template #header >
            <span></span>
        </template>
        <div class="">
            <div class="grid grid-cols-4 bg-custom-green-v2 h-[50px]" >
                <div class="flex items-center border" >
                    <div class="pl-3" >
                        <span class="text-white font-semibold" >COMPUTER COMPONENT</span>
                    </div>
                </div>
                <div class="flex items-center border" >
                    <div class="pl-3" >
                        <span class="text-white font-semibold" >NETWORK</span>
                    </div>
                </div>
                <div class="flex items-center border" >
                    <div class="pl-3" >
                        <span class="text-white font-semibold" >SYSTEM</span>
                    </div>
                </div>
                <div class="flex items-center border" >
                    <div class="pl-3" >
                        <span class="text-white font-semibold" >OTHERS</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-4" >
                <div class="border p-2" >
                    <div>
                        <span>Hardware</span>
                        <InputText class="w-full" v-model="checked.component.hardware" type="text" placeholder="Specify" />
                    </div>
                    <div>
                        <span>Software</span>
                        <InputText class="w-full" v-model="checked.component.software" type="text" placeholder="Specify" />
                    </div>
                </div>
                <div class="border p-2" >
                    <div class="flex align-items-center">
                        <Checkbox v-model="checked.network.lan" name="network" value="lan" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">LAN</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.network.internet" name="network" value="internet" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">INTERNET</label>
                    </div>
                    <div >
                        <span>Other Specify</span>
                        <InputText class="w-full" v-model="checked.network.specify" type="text" placeholder="Specify" />
                    </div>
                </div>
                <div class="border p-2" >
                    <div class="flex align-items-center">
                        <Checkbox v-model="checked.system.his" name="system" value="his" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">HIS</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.system.lis" name="system" value="lis" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">LIS</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.system.dms" name="system" value="dms" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">DMS</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.system.eNgas" name="system" value="eNgas" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">E-NGAS</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.system.phic" name="system" value="phic" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">PHIC</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.system.packWithRis" name="system" value="packWithRis" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">PACK WITH RIS</label>
                    </div>
                    <div >
                        <span>Other Specify</span>
                        <InputText class="w-full" v-model="checked.system.specify" type="text" placeholder="Specify" />
                    </div>
                </div>
                <div class="border p-2" >
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.other.web" name="other" value="website" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">WEBSITE</label>
                    </div>
                    <div class="flex align-items-center my-1">
                        <Checkbox v-model="checked.other.training" name="other" value="training" class="bg-slate-200 rounded-[10px]" />
                        <label for="ingredient1" class="ml-2">TRAINING</label>
                    </div>
                    <div >
                        <span>Other Specify</span>
                        <InputText class="w-full" v-model="checked.other.specify" type="text" placeholder="Specify" />
                    </div>
                </div>
            </div>
            <div class="my-3" >
                <strong class="font-semibold" >Description Of the Problem</strong>
                <p class="font-extralight capitalize" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere labore deserunt pariatur ad ipsum laborum in praesentium distinctio tenetur molestias mollitia, animi nobis saepe, illum illo reiciendis adipisci quis similique?</p>
            </div>
            <div class="my-3" >
                <strong class="font-semibold" >Action taken</strong>
                <p class="font-extralight capitalize" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere labore deserunt pariatur ad ipsum laborum in praesentium distinctio tenetur molestias mollitia, animi nobis saepe, illum illo reiciendis adipisci quis similique?</p>
            </div>
            <div class="my-3" >
                <strong class="font-semibold" >Recommendation(s)</strong>
                <p class="font-extralight capitalize" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere labore deserunt pariatur ad ipsum laborum in praesentium distinctio tenetur molestias mollitia, animi nobis saepe, illum illo reiciendis adipisci quis similique?</p>
            </div>
        </div>
    </Dialog>
</template>
<script setup>

import { ref,computed,reactive } from 'vue';
const search = ref('')
const visible =ref(false);


const completedData = ref([
    {ticketID: '2020-01', firstname: 'john' , lastname: 'doe', device:'pjg-comp-001',division: "finance", section: 'accounting' ,received: '2024-03-34', started:'2024-03-34', finished:'2024-03-34',conducted: "mr. developer" }
]);

const checked = reactive({
    component: {
        hardware: '',
        software: ''
    },
    network: {
        lan: "",
        internet: "",
        specify: ""
    },
    system: {
        his: "",
        lis: "",
        dms: "",
        eNgas:"",
        phic: "",
        packWithRis: "",
        specify: ""
    },
    other: {
        web:"",
        training: "",
        specify: ""
    }
});

const computed_completed = computed(()=>{
    return completedData.value.filter((data)=>{
        return data.ticketID.toLowerCase().includes(search.value.toLowerCase()) || 
        data.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastname.toLowerCase().includes(search.value.toLowerCase()) || 
        data.division.toLowerCase().includes(search.value.toLowerCase()) || 
        data.section.toLowerCase().includes(search.value.toLowerCase()) || 
        data.conducted.toLowerCase().includes(search.value.toLowerCase())
    })
});

</script>