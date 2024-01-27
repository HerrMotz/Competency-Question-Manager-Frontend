<script lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import SubmitButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import { ArrowDownOnSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import GroupDataService from "../services/GroupDataService.ts";

export default {
  name: "GroupDetailView",
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
      },
      membersInputField: '',
      members: [] as string[],
    }   
  },
  methods: {
    async fetchGroup() {
      console.log("fetching group");
      const response = await GroupDataService.getOne(this.id);

      if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response,
        };
        this.messagePopupData.open = true;
      } else {
        const { name, membersInputField, members }: GroupT = response.data;
        this.add.name = name;
        this.add.membersInputField = membersInputField;
        this.add.members = members.map((members: any) => members.email);
        console.log('Group Name:', this.add.name);
      }
    },
    async saveGroup() {
      console.log("saveGroup method called");
      
      try {
        const response = await GroupDataService.update(this.id, {
          name: this.add.name,
          membersInputField: this.membersInputField,
          members: this.members
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
          this.$router.push('/groups/');
        }
      } catch (error) {
        console.error("Error in saveGroup:", error);
      }
    },
    deleteGroup() {
      GroupDataService.delete(this.id);
      this.$router.push('/groups/');
    },
    addEditMembers() {
      if (this.membersInputField !== '') 
        this.members.push(this.membersInputField);
        this.membersInputField = '';     
    },

    removeEditMembers(index: number) {
      this.members.splice(index, 1);
    },
  },
  mounted() {
    this.fetchGroup(); 
  }
}
</script>

<template>
  <div v-if="add.name && messagePopupData.open === false" class="w-1/2 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse" :open="messagePopupData.open" @close="messagePopupData.open = false;" />

    <h1 class="text-2xl">Group Edit View</h1>
    <div>
      <div class="my-5">
        <label for="name" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900 mb-3">
          Group Name:
        </label>
        <div class="mt-2">
          <input
            type="text"
            name="group_name"
            id="group"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="add.name"
          />
        </div>
      </div>
    </div>   
    <div class="content-container">
      <div class="tags-input-container">
        <label
          for="tags-edit"
          class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900"
        >
          Assign Group Members:
        </label>
        <div class="tag-input" v-for="(member, index) in members" :key="'member'+ index">
          <span>{{ member }}</span>
          <button @click="removeEditMembers(index)" class="tags-remove" aria-label="Remove members">
            x
          </button>
        </div>
        <div class="mt-2">
          <textarea
            v-model="membersInputField"
            @keydown.enter="addEditMembers"
            placeholder="Enter e-mail address"
            rows="1"
            name="members-add"
            id="members-add"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>  
      <div class="button-container">
        <button
          type="button"
          class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="saveGroup"
        >
          <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Save
        </button>
        <div class="mr-5">
          <SubmitButtonWithCallback
            agree-button-text="Delete the group"
            title="Are you sure you want to delete the group?"
            detail="This action is permanent."
            @modalsuccessclose="deleteGroup"
          >
            <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Delete
          </SubmitButtonWithCallback>
        </div>
      </div>
    </div>
  </div>
</template>
