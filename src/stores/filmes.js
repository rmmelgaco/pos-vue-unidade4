import {ref} from 'vue'
import {defineStore} from 'pinia'
import {chamadaHttp} from '@/stores/httpHelper.js';

export const useFilmesStore = defineStore('filmes', () => {
    const url = 'http://localhost:3000/filmes'
    const filmes = ref(null)
    const filme = ref(null)
    const carregando = ref(false)
    const mensagem = ref(null)

    const recuperarFilmes = () => {
        chamadaHttp(url, filmes, carregando, mensagem)
    }
    const inserirFilme = (novoFilme) => {
        chamadaHttp(url, filme, carregando, mensagem, 'POST', novoFilme)
    }
    const recuperarFilme = (idFilme) => {
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem)
    }
    const atualizarFilme = (idFilme, novoFilme) => {
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem, 'PATCH', novoFilme)
    }
    const excluirFilme = (idFilme) => {
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem, 'DELETE')
    }

    return {
        filmes, filme, carregando, mensagem,
        recuperarFilmes, recuperarFilme, inserirFilme, atualizarFilme, excluirFilme
    }
})
