<script lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import SaveButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import { ArrowDownOnSquareIcon } from "@heroicons/vue/24/solid";
import ProjectDataService from "../services/ProjectDataService.ts";

export default {
    name: "ProjectEditView",
    components: { MessagePopup, ArrowDownOnSquareIcon, SaveButtonWithCallback },
    props: {
      projectId: { type: String, required: true },
    },
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
        edit: {
          project: {
            name: "",
            managers: [],
            engineers: [],
          },
          projectManagerInputField: "",
          engineerInputField: "",
        },
      };
    },
  methods: {
    async saveEdit() {
      const projectId = this.projectId; // Assuming 'projectId' is a prop passed to this component

      const updateManagersResponse = await ProjectDataService.updateManagers(projectId, this.edit.project.managers);
      const updateEngineersResponse = await ProjectDataService.updateEngineers(projectId, this.edit.project.engineers);

      // Check responses and handle accordingly
      if ("messageType" in updateManagersResponse || "messageType" in updateEngineersResponse) {
        // Handle error responses
        const errorMessage = updateManagersResponse.message || updateEngineersResponse.message || "An error occurred while updating project details.";
        this.messagePopupData.uxresponse = {
          title: "Oops! An error occurred...",
          text: errorMessage,
          detail: "",
          messageType: "error"
        };
        this.messagePopupData.open = true;
      } else {
        // Successful
        this.$router.push("/projects/");
      }
    },
     addEditProjectManager() {
      if (this.edit.projectManagerInputField !== "")
        this.edit.project.managers.push(this.edit.projectManagerInputField);
      this.edit.projectManagerInputField = "";
    },
    removeEditProjectManager(index: number) {
      this.edit.project.managers.splice(index, 1);
    },
    addEditEngineer() {
      if (this.edit.engineerInputField !== "")
        this.edit.project.engineers.push(this.edit.engineerInputField);
      this.edit.engineerInputField = "";
    },
    removeEditEngineer(index: number) {
      this.edit.project.engineers.splice(index, 1);
    },
  },
  created() {
    // Fetch project data by ID and set it to the 'edit' data property
    // You may need to implement a service for fetching project data by ID
    // Example: const projectData = await ProjectDataService.getById(this.projectId);
    // this.edit.project = projectData;
  },
};
</script>


<template>
  <div class="w-1/2 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse" :open="messagePopupData.open" @close="messagePopupData.open = false;" />
    <h1 class="text-2xl">Edit Project</h1>
  </div>

  <div class="my-5">
    <label for="project" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900 mb-3">Project Title:</label>
    <div class="mt-2">
      <textarea v-model="edit.project.name" rows="1" name="project_name" id="project" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
    </div>
  </div>

  <div class="content-container">
    <div class="tags-input-container">
      <label for="project-add" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900">Assign Project Manager:</label>
      <div class="tag-input" v-for="(tag, index) in edit.project.managers" :key="'tag'+ index">
        <span>{{ tag }}</span>
        <button @click="removeEditProjectManager(index)" class="tag-remove" aria-label="Remove tag">x</button>
      </div>
      <div class="mt-2">
        <textarea v-model="edit.projectManagerInputField" @keydown.enter="addEditProjectManager" placeholder="Enter e-mail address" rows="1" name="project_add" id="project" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
      </div>
    </div>
    <div class="tags-input-container">
      <label for="project-add" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900 mb-2">Assign Engineer:</label>
      <div class="tag-input" v-for="(tag, index) in edit.project.engineers" :key="'tag'+ index">
        <span>{{ tag }}</span>
        <button @click="removeEditEngineer(index)" class="tag-remove" aria-label="Remove tag">x</button>
      </div>
      <div class="mt-2">
        <textarea v-model="edit.engineerInputField" @keydown.enter="addEditEngineer" placeholder="Enter e-mail address" rows="1" name="project_add" id="project" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
      </div>
    </div>
    <div class="button-container">
      <SaveButtonWithCallback class="mt-4" agree-button-text="Save Changes" title="Are you sure you want to save changes?" detail="Check for typos." @modalsuccessclose="saveEdit()">
        <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Save Changes
      </SaveButtonWithCallback>
    </div>
  </div>
</template>
