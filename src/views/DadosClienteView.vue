<script setup>
import {useClientesStore} from '@/stores/clientes.js';
import {useAutenticacaoStore} from '@/stores/autenticacao.js';
import {watch} from 'vue';

const clientesStore = useClientesStore()
const autententicacaoStore = useAutenticacaoStore()

const usuario = autententicacaoStore.usuarioAutenticado

watch(() => autententicacaoStore.usuarioAutenticado, (usuarioAutenticado) => {
  if (usuarioAutenticado) {
    clientesStore.recuperarClientesPorUsuario(usuarioAutenticado.id)
  }
}, {immediate: true})
</script>

<template>
  <h2>Dados do cliente</h2>
  <p>Nome: {{usuario.nome}}</p>
  <p>Login: {{usuario.login}}</p>
  <p>Perfil: {{usuario.perfil}}</p>
</template>