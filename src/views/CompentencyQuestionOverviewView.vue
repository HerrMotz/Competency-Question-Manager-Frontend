<script setup lang="ts">
import CompetencyQuestionListItem from "../components/CompetencyQuestionListItem.vue";
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import {ref} from "vue";

// const cqs = {
//   data: [
//     { question: "What is the topping of a Hawaii pizza?", creator: "Daniel", id: "pizza-hawaii", rating: 2 },
//     { question: "What is the topping of a Diavolo pizza?", creator: "Daniel", id: "pizza-diavolo", rating: 5 },
//     { question: "What is the topping of a random pizza?", creator: "Daniel", id: "pizza-random", rating: 3 }
// ]}

const messagePopupData = ref({
  title: "",
  messageType: "",
  text: "",
  detail: "",
  open: false
})

const cqs = ref();

try {
  const response = await CompetencyQuestionDataService.getAll();
  if ("messageType" in response) {
    messagePopupData.value = {
      ...messagePopupData.value,
      ...response
    };
    messagePopupData.value.open = true;

  } else {
    cqs.value = response;
    console.log(cqs.value.data)
  }
}
</script>

<template>
  <MessagePopup :title="messagePopupData.title"
                :message-type="messagePopupData.messageType"
                :text="messagePopupData.text"
                :detail="messagePopupData.detail"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false; console.log(messagePopupData)"/>
  <div v-if="cqs" class="w-2/3 m-auto">
    <h1 class="text-2xl">Competency Question: Overview</h1>
    <CompetencyQuestionListItem v-for="cq in cqs.data" :text="cq.question" :creator="cq.creator" :identifier="cq.id"
                                :rating="cq.rating"/>
  </div>

</template>

<style scoped>

</style>