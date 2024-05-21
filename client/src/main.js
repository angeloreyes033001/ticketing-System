import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Lara from './presets/lara'
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import OverlayPanel from 'primevue/overlaypanel';
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toast from 'primevue/toast';
import Checkbox from 'primevue/checkbox';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
    unstyled: false,
    pt:Lara
});
app.use(ToastService);
app.component("InputText",InputText)
app.component("InputGroup",InputGroup)
app.component("InputGroupAddon",InputGroupAddon)
app.component("Button",Button)
app.component("Card",Card)
app.component("DataTable",DataTable)
app.component("Column",Column)
app.component("OverlayPanel",OverlayPanel)
app.component("Dialog",Dialog)
app.component("Textarea",Textarea)
app.component("Dropdown",Dropdown)
app.component("TabView",TabView)
app.component("TabPanel",TabPanel)
app.component("Toast",Toast)
app.component("Checkbox",Checkbox)
app.component('Accordion',Accordion)
app.component('AccordionTab',AccordionTab)

app.use(router)

app.mount('#app')
