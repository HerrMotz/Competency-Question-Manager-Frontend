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

const projects = ref();

const response = await ProjectDataService.getAll();
if ("messageType" in response) {
  messagePopupData.value.uxresponse = {
    ...messagePopupData.value.uxresponse,
    ...response
  };
  messagePopupData.value.open = true;
} else {
  projects.value = response;
  console.log(projects.value.data);
}
</script>

<template>
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;" />
  <div class="m-auto w-1/2">
    <h1 class="text-2xl">
      Project Overview

      <RouterLink to="/projects/add/" class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Add
        <PlusIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
      </RouterLink>
    </h1>
    <div v-if="projects">
      <ProjectListItem v-for="project in projects.value.data"
                       :key="project.project_id"
                       class="max-w-xl"
                       :projectName="project.projectName"
                       :projectManager="project.projectManager"
                       :identifier="project.project_id" />
    </div>
    <div v-else>
      <!-- Loading Placeholder bleibt unverändert -->
    </div>
  </div>
</template>

<style scoped>

</style>