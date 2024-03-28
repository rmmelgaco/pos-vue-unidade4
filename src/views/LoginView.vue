<script setup>
import {useAutenticacaoStore} from '@/stores/autenticacao.js';
import {ref} from 'vue';

const autenticacaoStore = useAutenticacaoStore()
const senhaVisivel = ref(false)
const tipoSenha = ref('password')
const login = ref(null)
const senha = ref(null)

const alterarVisibilidade = () => {
  if (senhaVisivel.value) {
    senhaVisivel.value = false
    tipoSenha.value = 'password'
  } else {
    senhaVisivel.value = true
    tipoSenha.value = 'text'
  }
}

const fazerLogin = () => {
  autenticacaoStore.autenticarUsuario(login.value, senha.value)
}
</script>

<template>
  <main>
    <h2>Autenticação:</h2>
    <form>
      <input type='email' placeholder='login' v-model='login'/>
      <span>
        <input :type='tipoSenha' placeholder='senha' v-model='senha'/>
        <span @click='alterarVisibilidade'>
          <img v-show='!senhaVisivel' src='@/assets/icons/pass_show.png' width='20'/>
          <img v-show='senhaVisivel' src='@/assets/icons/pass_hide.jpeg' width='20'/>
        </span>
      </span>
      <button @click.prevent='fazerLogin'>Entrar</button>
    </form>
  </main>
</template>

<style scoped>
  main > form {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    width: 120px;
  }
  main > form > * {
    flex-grow: 1;
  }
  main > form input, main > form button {
    margin: 5px;
    padding: 10px;
  }
  main > form > button {
    border: none;
    color: #e5cccc;
    border-radius: 5px;
    background-color: #193857;
  }
</style>