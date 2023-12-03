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
  uxresponse: {
    title: "",
    messageType: "",
    text: "",
    detail: "",
  },
  open: false
})

const cqs = ref();

const response = await CompetencyQuestionDataService.getAll();
if ("messageType" in response) {
  messagePopupData.value.uxresponse = {
    ...messagePopupData.value.uxresponse,
    ...response
  };
  messagePopupData.value.open = true;

} else {
  cqs.value = response;
  console.log(cqs.value.data)
}
</script>

<template>
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;"/>
  <div class="m-auto w-1/2">
    <h1 class="text-2xl">Competency Question: Overview</h1>
    <div v-if="cqs">
      <CompetencyQuestionListItem v-for="cq in cqs.data"
                                  class="max-w-xl"
                                  :text="cq.question"
                                  :creator="cq.creator"
                                  :identifier="cq.id"
                                  :rating="cq.rating"/>
    </div>
    <div v-else>
      <div v-for="_ in 4" class="border-1 shadow rounded-md p-4 max-w-xl w-full mx-auto dark:bg-gray-700
          dark:text-gray-200 bg-gray-100 mt-10">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-500 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-500 rounded col-span-2"></div>
                <div class="h-2 bg-slate-500 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-slate-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>