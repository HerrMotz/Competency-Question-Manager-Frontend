<script setup lang="ts">
import ProjectListItem from "../components/ProjectListItem.vue";
import ProjectDataService from "../services/ProjectDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";


const messagePopupData = ref({
  uxresponse: {
    title: "",
    messageType: "",
    text: "",
    detail: "",
  },
  open: false
});

</script>

<template>
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;" />
  <div class="m-auto w-1/2">
    <h1 class="text-2xl">
      About this Project
    </h1>
    <h2 class="text-xl mt-10 mb-4">Report bugs</h2>
    <p>
      You can report bugs in the frontend to <a href="https://github.com/HerrMotz/Competency-Question-Manager-Frontend/issues" class="underline decoration-1 decoration-blue-500 hover:decoration-2">the frontend repository</a>
      and bugs in the backend to <a href="https://github.com/HerrMotz/Competency-Question-Manager-Backend/issues" class="underline decoration-1 decoration-blue-500 hover:decoration-2">the backend repository</a>.
    </p>
    <h2 class="text-xl mt-10 mb-4">The Developers</h2>
    <p>
      This program was realised in cooperation with Jan Martin Keil (DLR Jena) by:
    </p>
    <ul class="list-disc list-inside">
      <li>Dominik Buschhold (Backend)</li>
      <li>Malte Weber (Backend)</li>
      <li>Chiara Tunc (UX)</li>
      <li>Daniel Motz (Frontend)</li>
    </ul>
  </div>

</template>

<style scoped>

</style>