<script setup>
import {useRouter} from 'vue-router';
import {useFilmesStore} from '@/stores/filmes';
import {reactive, watch} from 'vue';

const router = useRouter()
const filmesStore = useFilmesStore()

const filme = reactive({})

const salvar = () => {
  filmesStore.inserirFilme(filme)
}

watch(() => filmesStore.carregando, (carregando) => {
      if (!carregando) {
        filmesStore.recuperarFilmes()
        router.replace({name: 'filmes'})
      }
    }
)
</script>
<template>
  <h3>Cadastrar filme</h3>
  {{filmesStore.mensagem}}
  <form>
    <input type='text' placeholder='Nome' v-model='filme.nome'/>
    <input type='text' placeholder='Classificação' v-model='filme.classificacao'/>
    <input type='text' placeholder='Gênero' v-model='filme.genero'/>
    <input type='number' placeholder='Duração' min='0' v-model.number='filme.duracao'/>
    <input type='checkbox' v-model='filme.emCartaz'/> <span>Em cartaz</span>
    <button @click.prevent='salvar'>Salvar</button>
  </form>
</template>

<style scoped>
form {
  margin: 10px 20px;
  display: flex;
  flex-direction: column;
}

form > * {
  margin: 2px 5px;
  padding: 10px;
}
</style>
