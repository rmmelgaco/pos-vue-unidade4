<script setup>
import {useClientesStore} from '@/stores/clientes.js';
import {useAutenticacaoStore} from '@/stores/autenticacao.js';
import {watch} from 'vue';
import Filme from '@/components/Filme.vue';

const clientesStore = useClientesStore()
const autententicacaoStore = useAutenticacaoStore()

watch(() => autententicacaoStore.usuarioAutenticado, (usuarioAutenticado) => {
  if (usuarioAutenticado) {
    clientesStore.recuperarClientesPorUsuario(usuarioAutenticado.id)
  }
}, {immediate: true})

watch(() => clientesStore.clienteDoUsuario, (cliente) => {
  if (cliente?.pedidos) {
    clientesStore.recuperarFilmesPorCliente(cliente?.pedidos)
  }
}, {immediate: true})
</script>

<template>
  <h2>Pedidos</h2>
  <section v-if='clientesStore.filmesCliente?.length'>
    <Filme v-for='(filme, indice) in clientesStore.filmesCliente'
           :key='`filme${indice}`' :filme='filme'/>
  </section>
</template>