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
    const adicionarFilme = (novoFilme) => {
        chamadaHttp(url, filme, carregando, mensagem, 'POST', novoFilme)
    }
    const recuperarFilme = (codigoFilme) => {
        chamadaHttp(`${url}/${codigoFilme}`, filme, carregando, mensagem)
    }
    const atualizarFilme = (codigoFilme, novoFilme) => {
        chamadaHttp(`${url}/${codigoFilme}`, filme, carregando, mensagem, 'PATCH', novoFilme)
    }
    const excluirFilme = (codigoFilme) => {
        chamadaHttp(`${url}/${codigoFilme}`, filme, carregando, mensagem, 'DELETE')
    }

    return {
        filmes, filme, carregando, mensagem,
        recuperarFilmes, recuperarFilme, adicionarFilme, atualizarFilme, excluirFilme
    }
})
