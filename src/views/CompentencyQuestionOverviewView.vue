<script setup lang="ts">
import CompetencyQuestionListItem from "../components/CompetencyQuestionListItem.vue";

const cqs = [
  { text: "What is the topping of a Hawaii pizza?", creator: "Daniel", identifier: 3, rating: 2 },
  { text: "What is the topping of a Diavolo pizza?", creator: "Daniel", identifier: 43, rating: 5 },
  { text: "Whatasdasd", creator: "asdasd", identifier: 123, rating: 3 }
]
</script>

<template>
  <h1 class="text-2xl">Competency Question: Overview</h1>
  <CompetencyQuestionListItem v-for="cq in cqs" :text="cq.text" :creator="cq.creator" :identifier="cq.identifier" :rating="cq.rating" />

</template>

<style scoped>

</style>