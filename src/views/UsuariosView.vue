<script setup>
import {useAutenticacaoStore} from '@/stores/autenticacao.js';

const autenticacaoStore = useAutenticacaoStore()
if (!autenticacaoStore?.usuarios?.length) {
  autenticacaoStore.recuperarUsuarios()
}
const usuarios = autenticacaoStore.usuarios
</script>

<template>
  <h1>Usuários</h1>
  <table>
    <thead>
    <tr>
      <th>Nome</th>
      <th>Login</th>
      <th>Perfil</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='(usuario, indice) in usuarios' :key='`usuario${indice}`'>
      <td>
        {{ usuario.nome }}
      </td>
      <td>
        {{ usuario.login }}
      </td>
      <td>
        {{ usuario.perfil }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-top: 40px;
  width: 60%;
  border-collapse: collapse;
  border: 2px solid darkgreen;
  border-radius: 10px;
}

table > thead > tr > th {
  margin: 10px;
  padding: 10px;
  border: 1px solid darkgreen;
  font-weight: bolder;
}

table > tbody > tr > td {
  margin: 10px;
  padding: 10px;
  border: 1px solid darkgreen;
}
</style>