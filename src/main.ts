import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import "./style.css";
import App from './App.vue';
import 'element-plus/dist/index.css';
// vue i18n
import I18n from '@/languages/index';

// pinia store
import pinia from '@/store';

const app = createApp(App);

app.use(ElementPlus).use(I18n).use(pinia).mount('#app');
