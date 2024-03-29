import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {chamadaHttp} from '@/stores/httpHelper.js';
import {useFilmesStore} from '@/stores/filmes.js';

const filmesStore = useFilmesStore()

export const useClientesStore = defineStore('clientes', () => {
    const url = 'http://localhost:3000/clientes'
    const cliente = ref(null)
    const clientes = ref(null)
    const clientesUsuario = ref(null)
    const filmesCliente = ref(null)
    const carregando = ref(null)
    const mensagem = ref(null)

    const clienteDoUsuario = computed(() => {
        if (clientesUsuario?.value?.length) {
            return clientesUsuario.value[0]
        } else {
            return null
        }
    })

    const recuperarClientesPorUsuario = (idUsuario) => {
        chamadaHttp(`${url}?idUsuario=${idUsuario}`, clientesUsuario, carregando, mensagem)
    }

    const recuperarFilmesPorCliente = (pedidos) => {
        pedidos?.forEach(async pedido => {
            const {idFilme} = pedido
            const filme = await filmesStore.retornarFilmePorId(idFilme)
            if (filme) {
                if (filmesCliente.value === null) {
                    filmesCliente.value = []
                }
                if (filmesCliente.value.filter(filmeSalvo => filmeSalvo.id == filme.id).length === 0) {
                    filmesCliente.value.push(filme)
                }
            }
        })
    }

    return {
        clientes, cliente, carregando, mensagem, clienteDoUsuario, filmesCliente,
        recuperarClientesPorUsuario,
        recuperarFilmesPorCliente
    }
})