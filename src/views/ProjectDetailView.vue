<script lang="ts">
import { ref } from 'vue';
import MessagePopup from "../components/MessagePopup.vue";
import SaveButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import { ArrowDownOnSquareIcon } from "@heroicons/vue/24/solid";
import ProjectDataService from "../services/ProjectDataService.ts";

interface Project {
  name: string;
  managers: string[];
  engineers: string[];
}

export default {
  props: {
    id: String,
  },
  setup(props) {
    const messagePopupData = ref({
      uxresponse: {
        title: "",
        messageType: "",
        text: "",
        detail: "",
      },
      open: false,
    });
    const project = ref({ name: "", managers: [], engineers: [] } as Project);

    const deleteProject = async () => {
      try {
        const response = await ProjectDataService.delete(props.id);

        if ("messageType" in response) {
          messagePopupData.value.uxresponse = {
            ...messagePopupData.value.uxresponse,
            ...response,
          };
          messagePopupData.value.open = true;
        } else {
          console.log("Project deleted successfully");
        
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    };

    const getOneProject = async () => {
      try {
        const response = await ProjectDataService.getOne(props.id);
        project.value = response.data;
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const edit = ref({
      project: {
        name: "",
        managers: [],
        engineers: [],
      } as Project,
      projectManagerInputField: "",
      engineerInputField: "",
    });

    const updateProject = async () => {
      const updatedData = {
        name: 'Updated Project Name',
        managers: ['Manager1', 'Manager2'],
        engineers: ['Engineer1', 'Engineer2']
      };

      const response = await ProjectDataService.update(props.id, updatedData);
      // Handle the response as needed
    };

    const removeEditProjectManager = (index: number) => {
      edit.value.project.managers.splice(index, 1);
    };

    const addEditProjectManager = () => {
      if (edit.value.projectManagerInputField) {
        edit.value.project.managers.push(edit.value.projectManagerInputField);
        edit.value.projectManagerInputField = '';
      }
    };

    const removeEditEngineer = (index: number) => {
      edit.value.project.engineers.splice(index, 1);
    };

    const addEditEngineer = () => {
      if (edit.value.engineerInputField) {
        edit.value.project.engineers.push(edit.value.engineerInputField);
        edit.value.engineerInputField = '';
      }
    };

    const saveEdit = async () => {
      try {
        const response = await ProjectDataService.update(props.id, edit.value.project);

        if ("messageType" in response) {
          messagePopupData.value.uxresponse = {
            ...messagePopupData.value.uxresponse,
            ...response,
          };
          messagePopupData.value.open = true;
        } else {
          console.log("Project updated successfully");
        }
      } catch (error) {
        console.error("Error updating project:", error);
      }
    };

    return {
      messagePopupData,
      edit,
      project,
      removeEditProjectManager,
      addEditProjectManager,
      removeEditEngineer,
      addEditEngineer,
      saveEdit,
      deleteProject,
      updateProject,
      getOneProject
    };
  },

  async mounted() {
    await getOneProject();
  },
};
</script>

<template>
    <div v-if="project && messagePopupData.open===false"
       class="w-1/2 mx-auto"/>
    <MessagePopup :uxresponse="messagePopupData.uxresponse"
                  :open="messagePopupData.open"
                  @close="messagePopupData.open = false;"/>
    <h1 class="text-2xl">
      Project Edit View
    </h1>

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
  <SaveButtonWithCallback class="mt-4" agree-button-text="Save Changes" title="Are you sure you want to save changes?" detail="Check for typos." @modalsuccessclose="saveEdit()">
    <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
    Save Changes
  </SaveButtonWithCallback>

  <button @click="deleteProject" class="ml-4 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
    <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
    Delete Project
  </button>
      </div>
    </div>
</template>
