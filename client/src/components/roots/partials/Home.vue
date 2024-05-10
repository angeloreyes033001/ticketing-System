<template>
    <div class="" >
        <div class="grid grid-cols-4 my-3 gap-3" >
            <div class="p-2 bg-custom-orange h-[120px] rounded-[20px] relative overflow-hidden shadow" >
                <div class="absolute w-[200px] h-[200px] bg-white/50 rounded-[50%] bottom-[-100px] right-[-50px]" ></div>
                <div class="grid items-center h-full" >
                    <div class="px-10" >
                        <div class="text-[30px] text-white font-bold" >{{ totals.pending }}</div>
                        <div class="text-white font-semibold" >TOTAL PENDING</div>
                    </div>
                </div>
            </div>
            <div class="p-2 bg-custom-green h-[120px] rounded-[20px] relative overflow-hidden shadow" >
                <div class="absolute w-[200px] h-[200px] bg-white/50 rounded-[50%] bottom-[-100px] right-[-50px]" ></div>
                <div class="grid items-center h-full" >
                    <div class="px-10" >
                        <div class="text-[30px] text-white font-bold" >{{totals.completed}}</div>
                        <div class="text-white font-semibold" >TOTAL COMPLETED</div>
                    </div>
                </div>
            </div>
            <div class="p-2 bg-custom-blue h-[120px] rounded-[20px] relative overflow-hidden shadow" >
                <div class="absolute w-[200px] h-[200px] bg-white/50 rounded-[50%] bottom-[-100px] right-[-50px]" ></div>
                <div class="grid items-center h-full" >
                    <div class="px-10" >
                        <div class="text-[30px] text-white font-bold" >{{totals.condemned}}</div>
                        <div class="text-white font-semibold" >TOTAL CONDEMNED</div>
                    </div>
                </div>
            </div>
            <div class="p-2 bg-custom-violet h-[120px] rounded-[20px] relative overflow-hidden shadow" >
                <div class="absolute w-[200px] h-[200px] bg-white/50 rounded-[50%] bottom-[-100px] right-[-50px]" ></div>
                <div class="grid items-center h-full" >
                    <div class="px-10" >
                        <div class="text-[30px] text-white font-bold" >{{totals.users}}</div>
                        <div class="text-white font-semibold" >TOTAL USERS</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-[3fr,400px]  h-max-[400px] gap-5 mt-5" >
            <div class="mt-3" >
                <h6 class="text-center" >Monthly Total Request</h6>
                <Chart type="bar" :data="totalPerDivision" :options="chartOptionsDivision" />
            </div>
            <div class="p-5" >
                <h6 class="text-center" >Monthly Total Request</h6>
                <div class="text-center" >
                    <Chart type="pie" :data="totalPerService" :options="chartOptionsService" />
                </div>
            </div>
        </div>
        <div class="bg-white shadow my-5 p-5" >
            <DataTable :value="completedTicket" paginator :rows="10" class="" >
                <Column field="ticketID" header="TICKETID" class="capitalize" ></Column>
                <Column field="firstname" header="FIRSTNAME" class="capitalize" ></Column>
                <Column field="lastname" header="LASTNAME" class="capitalize" ></Column>
                <Column field="device" header="DEVICE NO" class="uppercase" ></Column>
                <Column field="received" header="RECEIVED" class="capitalize" ></Column>
                <Column field="started" header="STARTED" class="capitalize" ></Column>
                <Column field="finished" header="FINISHED" class="capitalize" ></Column>
            </DataTable>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref} from 'vue';
import Chart from 'primevue/chart';
import { userStore } from '@/stores/user.store';

const totals = reactive({
    pending: 0,
    completed: 0,
    condemned: 0,
    users: 0
})

const completedTicket = ref([
    {ticketID: "2020-02-01",firstname: "john", lastname: "doe", device: "pjg-comp-001", received: "2020-02-24", started: "2020-02-24", finished: "2020-02-24" },
    {ticketID: "2020-02-02",firstname: "john", lastname: "doe", device: "pjg-comp-001", received: "2020-02-24", started: "2020-02-24", finished: "2020-02-24" },
    {ticketID: "2020-02-03",firstname: "john", lastname: "doe", device: "pjg-comp-001", received: "2020-02-24", started: "2020-02-24", finished: "2020-02-24" },
    {ticketID: "2020-02-04",firstname: "john", lastname: "doe", device: "pjg-comp-001", received: "2020-02-24", started: "2020-02-24", finished: "2020-02-24" },
    {ticketID: "2020-02-05",firstname: "john", lastname: "doe", device: "pjg-comp-001", received: "2020-02-24", started: "2020-02-24", finished: "2020-02-24" }
]);

const totalPerDivision = ref({
    labels: ["Under MMC", "Nursing","Medical", "HOPPS" , "Finance", "Allied", "Others"], 
    datasets:[
        {
            label:"DIVISION MONTHLY  TOTAL REQUESTED",
            data:[100,20,30,40,100,20,30],
            backgroundColor: [
                '#42A5F5', // Color for "Under MMC"
                '#66BB6A', // Color for "Nursing"
                '#FFA726', // Color for "Medical"
                '#EC407A', // Color for "HOPPS"
                '#AB47BC', // Color for "Finance"
                '#78909C', // Color for "Allied"
                '#FF7043'  // Color for "Others"
            ]
        }
    ]
});

const chartOptionsDivision = ref({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        // legend: {

        //     labels: {
        //         usePointStyle: true,
        //     }
        // }   
        legend: false
    },
});

const totalPerService = ref({
    labels: ["Service", "Network","Website", "Change"], 
    datasets:[
        {
            data:[100,20,30,40]
        }
    ]
});

const chartOptionsService = ref({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
            }
        }
    },
});


const FetchTotal = async()=>{
    try {
        await userStore().getTotalUsers();
        const response = userStore().getResponse;
        if(response.status){
           totals.users = response.total;
        }
    } catch (error) {
        console.error(error)
    }
}


onMounted(async()=>{
    await FetchTotal();
})

</script>