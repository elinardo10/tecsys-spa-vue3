import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { createWebHistory } from 'vue-router'

import createRouter from './routes.js'
const router = createRouter(createWebHistory())
import App from './App.vue'
const app = createApp(App)

app.use(router).mount('#app')
