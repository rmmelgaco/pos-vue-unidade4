import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {chamadaHttp} from '@/stores/httpHelper.js';

export const useAutenticacaoStore = defineStore('auth', () => {
    const url = 'http://localhost:3000/usuarios'

    const usuario = ref(null)
    const carregando = ref(null)
    const mensagem = ref(null)

    const estaAutenticado = computed(() => usuario.value)
    const usuarioAutenticado = computed(() => usuario?.value?.length ? usuario.value[0] : null)

    const cadastrarUsuario = (novoUsuario) => {
        chamadaHttp(url, usuario, carregando, mensagem, 'Post', novoUsuario)
    }

    const autenticarUsuario = (login, senha) => {
        chamadaHttp(`${url}?login=${login}&senha=${senha}&_limit=1`, usuario, carregando, mensagem)
    }

    return {
        usuario, carregando, mensagem, estaAutenticado, usuarioAutenticado,
        cadastrarUsuario, autenticarUsuario
    }
})