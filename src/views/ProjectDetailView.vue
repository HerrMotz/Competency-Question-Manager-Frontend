<script lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import SubmitButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import { ArrowDownOnSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import ProjectDataService from "../services/ProjectDataService.ts";


export default {
  name: "ProjectDetailView",
  components: { MessagePopup, ArrowDownOnSquareIcon, SubmitButtonWithCallback, TrashIcon },
  props: {
    id: { type: String, required: true }
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
      add: {
        name: "",
        projectManagerInputField: '',
        projectManager: [] as string[],

        engineerInputField: '',
        engineer: [] as string[],
      },
    }
  },
  methods: {
    async fetchProject() {
      console.log("fetching project")
      const response = await ProjectDataService.getOne(this.id);

      if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response,
        };
        this.messagePopupData.open = true;
      } else {
        const { name, managers, engineers } = response.data;
          this.add.name = name;
          this.add.projectManager = managers;
          this.add.engineer = engineers;
          console.log('Project Title:', this.add.name);
        }
    },
    async saveProject() {
      console.log("saveProject method called");

      try {
        const response = await ProjectDataService.update(this.id, {
          name: this.add.name,
          managers: this.add.projectManager,
          engineers: this.add.engineer
        });

        console.log("API Response:", response);

        if ("messageType" in response) {
          console.log("Error response:", response);
          this.messagePopupData.uxresponse = {
            ...this.messagePopupData.uxresponse,
            ...response
          };
          this.messagePopupData.open = true;
        } else {
          console.log("Successful response:", response);
          this.add.name = response.data.name;
          this.$router.push('/projects/');
        }
      } catch (error) {
        console.error("Error in saveProject:", error);
      }
    },
    deleteProject() {
      ProjectDataService.delete(this.id);
      this.$router.push('/projects/');
    },
    addEditProjectManager() {
      if (this.add.projectManagerInputField !== '') {
        ProjectDataService.addManagers(this.id, [this.add.projectManagerInputField]).then((response) => {
          if ('messageType' in response) {
            this.messagePopupData.uxresponse = {
              ...this.messagePopupData.uxresponse,
              ...response,
            };
          }
          this.add.projectManagerInputField = '';
          this.fetchProject()
        });
      }
    },

    removeEditProjectManager(member) {
      console.log(member)
      ProjectDataService.removeManagers(this.id, [member.id]).then((response) => {
        if ('messageType' in response) {
          this.messagePopupData.uxresponse = {
            ...this.messagePopupData.uxresponse,
            ...response,
          };
        }
        this.fetchProject()
      });
    },

    addEditEngineer() {
      if (this.add.engineerInputField !== '') {
        ProjectDataService.addEngineers(this.id, [this.add.engineerInputField]).then((response) => {
          if ('messageType' in response) {
            this.messagePopupData.uxresponse = {
              ...this.messagePopupData.uxresponse,
              ...response,
            };
          }
          this.add.engineerInputField = '';
          this.fetchProject()
        });
      }
    },
    removeEditEngineer(member) {
      ProjectDataService.removeEngineers(this.id, [member.id]).then((response) => {
        if ('messageType' in response) {
          this.messagePopupData.uxresponse = {
            ...this.messagePopupData.uxresponse,
            ...response,
          };
        }
        this.fetchProject()
      });
    },
  },
  mounted() {
    this.fetchProject();
  }
}

</script>

<template>
  <div v-if="add.name && !messagePopupData.open" class="w-1/2 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse" :open="messagePopupData.open" @close="messagePopupData.open = false;" />

    <h1 class="text-2xl">Project Edit View</h1>
    <div>
      <div class="my-5">
        <label for="project" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900 mb-3">
          Project Title:
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="project_name"
            id="project"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="add.name"
          />
        </div>
      </div>
    </div>
  </div>

    <div class="content-container">

    <div class="content-container">
      <div class="tags-input-container">
        <label
          for="project_manager-edit"
          class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900"
        >
          Assign Project Manager:
        </label>
        <span v-for="(member, index) in add.projectManager" :key="'tag'+ index" class="inline-flex mr-4 items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {{ member.email }}
          <button @click="removeEditProjectManager(member)" type="button" class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
            <span class="sr-only">Remove</span>
            <svg viewBox="0 0 14 14" class="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span class="absolute -inset-1" />
          </button>
        </span>
        <div class="mt-2">
          <textarea
            v-model="add.projectManagerInputField"
            @keydown.enter="addEditProjectManager"
            placeholder="Enter e-mail address"
            rows="1"
            name="project_manager-add"
            id="project_manager-add"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>

      <div class="tags-input-container">
        <label
          for="engineer-edit"
          class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900 mb-2"
        >
          Assign Engineer:
        </label>
        <span v-for="(member, index) in add.engineer" :key="'tag'+ index" class="inline-flex mr-4 items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {{ member.email }}
          <button @click="removeEditEngineer(member)" type="button" class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
            <span class="sr-only">Remove</span>
            <svg viewBox="0 0 14 14" class="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span class="absolute -inset-1" />
          </button>
        </span>
        <div class="mt-2">
          <textarea
            v-model="add.engineerInputField"
            @keydown.enter="addEditEngineer"
            placeholder="Enter e-mail address"
            rows="1"
            name="engineer-add"
            id="engineer-add"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button
        type="button"
        class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="saveProject"
      >
        <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Save
      </button>
      <div class="mr-5">
        <SubmitButtonWithCallback
          agree-button-text="Delete the project"
          title="Are you sure you want to delete the project?"
          detail="This action is permanent."
          @modalsuccessclose="deleteProject"
        >
          <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Delete
        </SubmitButtonWithCallback>
      </div>
    </div>
  </div>
</template>