import {ref} from 'vue'
import {defineStore} from 'pinia'
import {chamadaHttp} from '@/stores/httpHelper.js';

export const useFilmesStore = defineStore('filmes', () => {
    const url = 'http://localhost:3000/filmes'
    const filmes = ref(null)
    const filme = ref(null)
    const carregando = ref(false)
    const mensagem = ref(null)
    const filmeSalvo = ref(false)

    const recuperarFilmes = () => {
        chamadaHttp(url, filmes, carregando, mensagem)
    }
    const inserirFilme = (novoFilme) => {
        filmeSalvo.value = false
        chamadaHttp(url, filme, carregando, mensagem, filmeSalvo, 'POST', novoFilme)
    }
    const recuperarFilme = (idFilme) => {
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem)
    }

    const retornarFilmePorId = async (idFilme) => {
        let filme = null
        try {
            const resposta = await fetch(`${url}/${idFilme}`)
            filme = await resposta.json()
        } catch(erro) {
            mensagem.value = erro
        }
        return filme
    }
    const atualizarFilme = (idFilme, novoFilme) => {
        filmeSalvo.value = false
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem, filmeSalvo, 'PATCH', novoFilme)
    }
    const excluirFilme = (idFilme) => {
        filmeSalvo.value = false
        chamadaHttp(`${url}/${idFilme}`, filme, carregando, mensagem, filmeSalvo, 'DELETE')
    }

    return {
        filmes, filme, carregando, mensagem, filmeSalvo,
        recuperarFilmes, recuperarFilme, inserirFilme, atualizarFilme, excluirFilme, retornarFilmePorId
    }
})
