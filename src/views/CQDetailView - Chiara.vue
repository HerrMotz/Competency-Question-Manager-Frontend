<script setup lang="ts">
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import { ref, defineProps } from "vue";
import {StarIcon} from "@heroicons/vue/24/solid";

const props = defineProps(['id'])

const messagePopupData = ref({
  uxresponse: {
    title: "",
    messageType: "",
    text: "",
    detail: "",
  },
  open: false
})

const cq = ref();
    
const response = await CompetencyQuestionDataService.getOne(props.id);

if ("messageType" in response) {
  messagePopupData.value.uxresponse = {
    ...messagePopupData.value.uxresponse,
    ...response
  };
  messagePopupData.value.open = true;

} else {
  cq.value = response;
  console.log(cq.value.data)
}
</script>

<template>
  <div>
    <p>Topic: {{ cq.data.topic }}</p>
  </div>

  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;"/>
  <h1 class="text-2xl">
    {{cq.data.question}}
    <span class="inline-flex items-center rounded-md dark:bg-blue-400/10 px-2 py-1 text-xs font-medium dark:text-blue-400 ring-1 ring-inset dark:ring-blue-400/30
                  bg-blue-50 text-blue-700 ring-blue-700/10">
      Version: {{cq.data.version}}
    </span>
    <span class="inline-block text-right ml-2">
      <StarIcon v-for="_ in cq.data.rating" class="h-5 w-5 text-yellow-500 inline" aria-hidden="true" />
      <StarIcon v-for="_ in (5 - cq.data.rating)" class="h-5 w-5 text-gray-500 inline" aria-hidden="true" />
    </span>
  </h1>
  <pre class="text-sm">{{cq.data.id}}</pre>

</template>

<style scoped>

</style>