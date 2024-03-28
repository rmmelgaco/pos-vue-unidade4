import {createRouter, createWebHashHistory} from 'vue-router';
import InicioView from '@/views/InicioView.vue';

const rotaInicio = {
    path: '/',
    name: 'inicio',
    component: InicioView
}
const importLoginPage = () => import('../views/LoginView.vue')
const rotaLogin = {
    path: '/login',
    name: 'login',
    component: importLoginPage
}
const routes = [
    rotaInicio,
    rotaLogin
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router