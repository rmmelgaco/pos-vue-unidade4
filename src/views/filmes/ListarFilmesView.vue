<script setup>

import {useFilmesStore} from '@/stores/filmes.js';
import Filme from '@/components/Filme.vue';

const filmesStore = useFilmesStore()
if (!filmesStore?.filmes?.length) {
  filmesStore.recuperarFilmes()
}
</script>
<template>
  <h3>Lista de filmes</h3>
  <section v-if='filmesStore?.filmes?.length'>
    <RouterLink v-for='(filme, indice) in filmesStore.filmes'
                :key='`filme${indice}`' :to='{name: "detalhe-filme", params: { codigoFilme: filme.codigo}}'>
      <Filme :filme='filme'/>
    </RouterLink>
  </section>
  <section v-else>
    <p>Não há filmes disponíveis!</p>
  </section>
</template>

<style scoped>
a {
  color: darkblue;
}
</style>
