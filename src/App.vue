<script setup>
import {useAutenticacaoStore} from '@/stores/autenticacao.js';
import {useRouter} from 'vue-router';
import {computed, watch} from 'vue';

const autenticacaoStore = useAutenticacaoStore()

const router = useRouter()

const menus = [
  { label: 'Início', rota: '/' }
]

const menusAdministrador = [
  { label: 'Filmes', rota: '/filmes' },
  { label: 'Usuários', rota: '/usuarios' }
]

const menusCliente = [
  { label: 'Pedidos', rota: '/pedidos' },
  { label: 'Dados cliente', rota: '/dados-cliente' },
]

const menusUsuario = computed(() => {
  if (autenticacaoStore?.usuarioAutenticado?.perfil === 'Administrador') {
    return [...menus, ...menusAdministrador]
  }
  else if (autenticacaoStore?.usuarioAutenticado?.perfil === 'Cliente') {
      return [...menus, ...menusCliente]
  } else if (autenticacaoStore.usuarioAutenticado){
    return menus
  }
})

const logout =  () => {
  autenticacaoStore.usuario = null
}

watch(() => autenticacaoStore.usuarioAutenticado, (usuarioAutenticado) => {
  if (usuarioAutenticado) {
    router.replace({ name: 'inicio'})
  }
})
</script>
<template>
  <header>
    <div class='wrapper'>
      <nav>
        <RouterLink
            v-for='(menu, indice) in menusUsuario'
            :key='`menu${indice}`' :to='menu.rota'
        >{{ menu.label }}</RouterLink>
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
