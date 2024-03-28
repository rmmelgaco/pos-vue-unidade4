<script setup>
const menus = [
  {label: 'Filmes', rota: {name: 'filmes'}},
  {label: 'Inserir', rota: {name: 'inserir-filme'}}
]
</script>

<template>
  <nav>
    <RouterLink v-for='(menu, indice) in menus'
                :key='`menu${indice}`'
                :to='menu.rota'>{{ menu.label}}</RouterLink>
  </nav>
  <RouterView/>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
}
a {
  font-size: 1.5rem;
  margin: 0 10px;
  color: #193857;
}
</style>