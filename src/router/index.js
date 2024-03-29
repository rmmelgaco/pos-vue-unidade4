import {createRouter, createWebHashHistory} from 'vue-router';
import InicioView from '@/views/InicioView.vue';
import {useAutenticacaoStore} from '@/stores/autenticacao.js';

const importLoginPage = () => import('../views/LoginView.vue')
const importFilmesPage = () => import('../views/filmes/FilmesView.vue')
const importListarFilmesPage = () => import('../views/filmes/ListarFilmesView.vue')
const importInserirFilmePage = () => import('../views/filmes/InserirFilmeView.vue')
const importDetalhesFilmePage = () => import('../views/filmes/DetalhesFilmeView.vue')
const importPedidosPage = () => import('../views/PedidosView.vue')
const importUsuariosPage = () => import('../views/UsuariosView.vue')
const importDadosClientePage = () => import('../views/DadosClienteView.vue')

const rotaInicio = {
    path: '/',
    name: 'inicio',
    component: InicioView
}

const rotaLogin = {
    path: '/login',
    name: 'login',
    component: importLoginPage
}

const rotaFilmes = {
    path: '/filmes',
    component: importFilmesPage,
    meta: {requerPerfilAdministrador: true},
    children: [
        {path: '', name: 'filmes', component: importListarFilmesPage},
        {path: '/:idFilme', name: 'detalhe-filme', component: importDetalhesFilmePage},
        {path: '/inserir', name: 'inserir-filme', component: importInserirFilmePage},
        {path: '/:idFilme/editar', name: 'editar-filme', component: importInserirFilmePage}
    ]
}

const rotaUsuarios = {
    path: '/usuarios',
    name: 'usuarios',
    component: importUsuariosPage,
    meta: {requerPerfilAdministrador: true}
}

const rotaPedidos = {
    path: '/pedidos',
    name: 'pedidos',
    component: importPedidosPage,
    meta: {
        requerAutenticacao: true
    }
}

const rotaDadosCliente = {
    path: '/dados-cliente',
    name: 'dados-cliente',
    component: importDadosClientePage,
    meta: {
        requerAutenticacao: true
    }
}

const routes = [
    rotaInicio,
    rotaLogin,
    rotaFilmes,
    rotaUsuarios,
    rotaPedidos,
    rotaDadosCliente
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to) => {
    const autenticacaoStore = useAutenticacaoStore()
    const usuarioAdministrador = autenticacaoStore?.usuarioAutenticado?.perfil === 'Administrador'
    const usuarioCliente = autenticacaoStore?.usuarioAutenticado?.perfil === 'Cliente'
    const acessoValido =
        (usuarioAdministrador && to.meta.requerPerfilAdministrador)
        || (usuarioCliente && to.meta.requerAutenticacao)
        || (!to.meta.requerPerfilAdministrador && !to.meta.requerAutenticacao)
    if (!acessoValido) {
        return {name: 'login'}
    }
})

export default router