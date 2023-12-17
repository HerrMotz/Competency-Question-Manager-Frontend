<script lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import AddProjectDataService from "../services/AddProjectDataService.ts";
import SaveButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import {ArrowDownOnSquareIcon} from "@heroicons/vue/24/solid";

export default{
  name: "AddProject",
  components: {ArrowDownOnSquareIcon, SaveButtonWithCallback},
  data() {
    return {
      messagePopupData: {
        uxresponse: {
          title: "",
          messageType: "",
          text: "",
          detail: "",
        },
        open: false,
      },
      add: {
        project:"",
      },
    }
  },
  methods: {
    async save (){
      const response = await AddProjectDataService.add({
        project: this.add.project,
    });
    
    if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response
        };
        this.messagePopupData.open = true;

      } else {
        // successful
        this.add = response;
        this.$router.push('/addproject/');
      }
    }  
  }
};
</script>

<template>
  <div class="w-1/2 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse"
                  :open="messagePopupData.open"
                  @close="messagePopupData.open = false;"/>
    <h1 class="text-2xl">
    </h1>
    Add a new project
    <div class="my-5">
      <label for="project" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900">Add Project:</label>
      <div class="mt-2">
        <textarea v-model="add.project" rows="4" name="project_name" id="project" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
    </div>

    <SaveButtonWithCallback agree-button-text="Save this question?"
                            title="Are you sure you want to add the question?"
                            detail="Check for typos."
                            @modalsuccessclose="save()">
      <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
      Add
    </SaveButtonWithCallback>
  </div>
</template>

<style scoped>

</style>
