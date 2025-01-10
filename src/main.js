import { createApp } from 'vue'
import router from './router'
import store from './store'
import './style.css'
import App from './App.vue'
import {MotionPlugin} from '@vueuse/motion'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(MotionPlugin)

createApp(App).use(router).use(store).mount('#app');
