<script setup>
import Filme from '@/components/Filme.vue';
import {useFilmesStore} from '@/stores/filmes.js';
import {computed} from 'vue';

const filmesStore = useFilmesStore()

if (!filmesStore?.filmes?.length) {
  filmesStore.recuperarFilmes()
}

const filmesEmCartaz = computed(() => {
  return filmesStore?.filmes?.filter((filme) => filme.emCartaz)
})
</script>

<template>
  <main>
    <p v-show='filmesStore.carregando'>Carregando...</p>
    <h2>Filmes em cartaz:</h2>
    <section v-if='filmesEmCartaz?.length'>
      <Filme v-for='(filme, indice) in filmesEmCartaz'
             :key='`filme${indice}`'
             :filme='filme' />
    </section>
    <section v-else>
      <p>Nenhum filme em cartaz!</p>
    </section>
  </main>
</template>
<style scoped>
  main > section {
    margin: 5px;
    padding: 10px;
  }
</style>