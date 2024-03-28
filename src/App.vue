<script setup>
import {useAutenticacaoStore} from '@/stores/autenticacao.js';
import {useRouter} from 'vue-router';
import {watch} from 'vue';

const autenticacaoStore = useAutenticacaoStore()

const router = useRouter()

const logout =  () => {
  autenticacaoStore.usuario = null
}

watch(() => autenticacaoStore.usuarioAutenticado, (usuarioAutenticado) => {
  if (usuarioAutenticado) {
    router.replace({ name: 'inicio' +
          ''})
  }
})
</script>
<template>
  <header>
    <div class='wrapper'>
      <nav>
        <RouterLink to='/'>Início</RouterLink>
        <RouterLink v-if='!autenticacaoStore.usuarioAutenticado' to='/login'>Login</RouterLink>
        <a v-else @click='logout' >Logout</a>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped>
header > div > nav {
  width: 90vw;
  display: flex;
  justify-content: space-between;

}
.tab_menu {
  margin: 5px;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #52e7d6;
}

.tab_item {
  padding: 10px;
  color: #15295d;
  flex: 1;
  text-align: center;
  font-size: larger;
  font-weight: bolder;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
