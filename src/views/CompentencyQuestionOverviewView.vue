<script setup lang="ts">
import CompetencyQuestionListItem from "../components/CompetencyQuestionListItem.vue";

const cqs = {data: [
  { question: "What is the topping of a Hawaii pizza?", creator: "Daniel", id: "pizza-hawaii", rating: 2 },
  { question: "What is the topping of a Diavolo pizza?", creator: "Daniel", id: "pizza-diavolo", rating: 5 },
  { question: "What is the topping of a random pizza?", creator: "Daniel", id: "pizza-random", rating: 3 }
]}

// const cqs = await CompetencyQuestionDataService.getAll()
// console.log(cqs.data)

</script>

<template>
  <h1 class="text-2xl">Competency Question: Overview</h1>

  <CompetencyQuestionListItem v-for="cq in cqs.data" :text="cq.question" :creator="cq.creator" :identifier="cq.id" :rating="cq.rating" />

</template>

<style scoped>

</style>