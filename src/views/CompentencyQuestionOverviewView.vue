<script setup lang="ts">
import CompetencyQuestionListItem from "../components/CompetencyQuestionListItem.vue";
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import {ref} from "vue";
import {AxiosResponse} from "axios/index";

// const cqs = {
//   data: [
//     { question: "What is the topping of a Hawaii pizza?", creator: "Daniel", id: "pizza-hawaii", rating: 2 },
//     { question: "What is the topping of a Diavolo pizza?", creator: "Daniel", id: "pizza-diavolo", rating: 5 },
//     { question: "What is the topping of a random pizza?", creator: "Daniel", id: "pizza-random", rating: 3 }
// ]}

const messagePopupData = ref({
  title: "",
  messageType: {messageType: "warning"},
  text: "",
  detail: "",
  open: false
})

let cqs : AxiosResponse<any, CompetencyQuestionT[]> = undefined;

try {
  cqs = await CompetencyQuestionDataService.getAll()
  console.log(cqs.data)
} catch (e) {
  messagePopupData.value.title = "Oops! An error occurred...";
  messagePopupData.value.messageType.messageType = "error";
  messagePopupData.value.text = "An error occurred while retrieving competency questions.";
  messagePopupData.value.detail = ""+e;
  messagePopupData.value.open = true;
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