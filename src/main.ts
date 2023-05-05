import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import "./style.css";
import App from './App.vue';
import 'element-plus/dist/index.css';

// pinia store
import pinia from '@/store';

const app = createApp(App);

app.use(ElementPlus).use(pinia).mount('#app');
