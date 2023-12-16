<script setup lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import AddProjectDataService from "../services/AddProjectDataService.ts";
import {ref} from "vue";
import ArrowDownOnSquareIcon from "@heroicons/vue/24/solid";

const props = defineProps(['project_id'])


const messagePopupData = ref({
  uxresponse: {
    title: "",
    text: "",
    detail: "",
    messageType: "",
  },
  open: false
})

const project = ref();

//TO Do: fetchAddProject --> API missing

fetchAddProject();
async function fetchAddProject() {
  const response = await AddProjectDataService.getOne(props.project_id);

  if ("messageType" in response) {
    messagePopupData.value.uxresponse = {
      ...messagePopupData.value.uxresponse,
      ...response
    };
    messagePopupData.value.open = true;

  } else {
    project.value = response;
    console.log(project.value.data)
  }
}
</script>

<template>
  <div v-if="project && messagePopupData.open===false"
      class="w-1/2 mx-auto">
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;"/>
  <h1 class="text-2xl">
  </h1>
  </div>
    
  <label for="AddProject"
          class="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Add Project:</label>
  <div class="mt-2">
      <input type="text" name="AddProject" id="project_id"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :value="project.value.data"
        />
  </div>
  <div class="mt-5 flex flex-row-reverse">
    <button type="button"
            class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
            Save
    </button>  
    </div>
</template>




