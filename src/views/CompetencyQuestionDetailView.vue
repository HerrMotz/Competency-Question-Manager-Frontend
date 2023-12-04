<script setup lang="ts">
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import {ref} from "vue";

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
const response = await CompetencyQuestionDataService.getAll();
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
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;"/>
  {{ cq }}
</template>

<style scoped>

</style>