import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/index.js';
import {createPinia} from 'pinia';

let app = createApp(App);

app.use(router)
app.use(createPinia())
app.mount('#app')
