import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
    path: '/login',
    name: 'LoginView',
    component: LoginView
    },
    {
        path: '/admin',
        name: 'IndexView',
        component: IndexView
    }
]   

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router