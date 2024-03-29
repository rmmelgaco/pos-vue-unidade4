<script setup>
  defineProps(['filme'])
</script>
<template>
  <div>
    <h3>
      {{ filme.nome }}
    </h3>
    <p>Classificação: {{filme.classificacao}}</p>
    <p>Duração: {{filme.duracao}} min</p>
    <p>Gênero: {{filme.genero}}</p>
    <slot></slot>
  </div>
</template>
<style scoped>
div {
  margin: 5px;
  padding: 10px;
  border: 1px solid lightblue;
}
div > p {
  padding: 5px 10px;
}
</style>