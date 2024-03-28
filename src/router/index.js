import {createRouter, createWebHashHistory} from 'vue-router';
import InicioView from '@/views/InicioView.vue';
import {useAutenticacaoStore} from '@/stores/autenticacao.js';

const rotaInicio = {
    path: '/',
    name: 'inicio',
    component: InicioView
}
const importLoginPage = () => import('../views/LoginView.vue')
const importFilmesPage = () => import('../views/filmes/FilmesView.vue')
const importListarFilmesPage = () => import('../views/filmes/ListarFilmesView.vue')
const importInserirFilmePage = () => import('../views/filmes/InserirFilmeView.vue')
const importDetalhesFilmePage = () => import('../views/filmes/DetalhesFilmeView.vue')

const rotaLogin = {
    path: '/login',
    name: 'login',
    component: importLoginPage
}


const rotaFilmes = {
    path: '/filmes',
    component: importFilmesPage,
    meta: {requiresAdmin: true},
    children: [
        {path: '/', name: 'filmes', component: importListarFilmesPage},
        {path: '/:codigoFilme', name: 'detalhe-filme', component: importDetalhesFilmePage},
        {path: '/inserir', name: 'inserir-filme', component: importInserirFilmePage},
    ]
}

const importUsuariosPage = () => import('../views/UsuariosView.vue')
const rotaUsuarios = {
    path: '/usuarios',
    name: 'usuarios',
    component: importUsuariosPage,
    meta: {requiresAdmin: true}
}

const routes = [
    rotaInicio,
    rotaLogin,
    rotaFilmes,
    rotaUsuarios
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    const autenticacaoStore = useAutenticacaoStore()
    if (
        to.meta.requiresAdmin && autenticacaoStore?.usuarioAutenticado?.perfil !== 'Administrador'
    ) {
        return {name: 'login'}
    }
})

export default router