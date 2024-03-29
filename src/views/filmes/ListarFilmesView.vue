<script setup>

import {useFilmesStore} from '@/stores/filmes.js';
import Filme from '@/components/Filme.vue';
import {computed} from 'vue';

const filmesStore = useFilmesStore()
if (!filmesStore?.filmes?.length) {
  filmesStore.recuperarFilmes()
}

const excluir = (idFilme) => {
  filmesStore.excluirFilme(idFilme)
  const listaFilmes = filmesStore.filmes
  for (let filme of listaFilmes) {
    if (filme.id === idFilme) {
      const indice = listaFilmes.indexOf(filme)
      listaFilmes.splice(indice, 1)
      break
    }
  }
}

const filmes = computed(() => filmesStore?.filmes)
</script>
<template>
  <h3>Lista de filmes</h3>
  <section v-if='filmes?.length'>
    <Filme v-for='(filme, indice) in filmes'
           :key='`filme${indice}`' :filme='filme'>
      <RouterLink :to='{name: "detalhe-filme", params: { idFilme: filme.id}}'>Detalhes</RouterLink>
      <a @click='excluir(filme.id)'>Excluir</a>
      <RouterLink :to='{name: "editar-filme", params: { idFilme: filme.id}}'>Editar</RouterLink>
    </Filme>
  </section>
  <section v-else>
    <p>Não há filmes disponíveis!</p>
  </section>
</template>

<style scoped>
</style>
