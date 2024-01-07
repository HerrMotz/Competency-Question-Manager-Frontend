<script lang="ts">
import MessagePopup from "../components/MessagePopup.vue";
import AddGroupDataService from "../services/GroupDataService.ts";
import SaveButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import {ArrowDownOnSquareIcon} from "@heroicons/vue/24/solid";

export default{
  name: "GroupCreateView",
  components: {ArrowDownOnSquareIcon, SaveButtonWithCallback},
  props: {
    index: {type: String}
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
        group:"", 
      },
    tagValue: '',
    tags: [] as string[],
    }
  },
  methods: {
    addTag() {
      if (this.tagValue !== '') 
        this.tags.push(this.tagValue)
        this.tagValue = '';
    },
    removeTag(index: number) {
      this.tags.splice(index, 1);
    },

    async save (){
      const response = await AddGroupDataService.add({
        name: this.add.group,
        members: this.tags,
    });
    
    if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response
        };
        this.messagePopupData.open = true;

      } else {
        // successful
        this.add.group = response.data.group;
        this.$router.push('/groups/add/');
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
  </div>  
    
    Add  group
    <div class="my-5">
      <label for="group" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900">Type in group name:</label>
      <div class="mt-2">
        <textarea v-model="add.group" rows="1" name="group" id="group" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
    </div>
   
    <div class="content-container">
    <div class="tags-input-container">
        <label for="group-add" class="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900">Assign group member:</label>
        <div class="tag-input" v-for="(tag, index) in tags" :key="'tag'+ index">
            <span>{{ tag }}</span>
            <button @click="removeTag(index)" class= "tag-remove" aria-label= "Remove tag">x</button>
        </div>
        <div class="mt-2">
            <textarea v-model="tagValue" @keydown.enter="addTag" placeholder= "Enter e-mail address" rows="5" name="group" id="group" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
    </div>
    <div class="button-container">
        <SaveButtonWithCallback class="mt-4"
                                agree-button-text="Save this group?"
                                title="Are you sure you want to add this group?"
                                detail="Check for typos."
                                @modalsuccessclose="save()">
            <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
            Save
        </SaveButtonWithCallback>
    </div>
</div>   
</template>

<style scoped>


.tag-input {
    border: 1px solid #ccc; 
    background-color: #f0f0f0; 
    padding: 5px; 
    border-radius: 5px; 
    margin-right: 5px; 
    display: inline-flex; 
    align-items: center; 
    gap: 5px; 
}


.content-container {
    display: flex;
    flex-direction: column;
}

.button-container {
    display: flex;
    justify-content: flex-end; 
}

.mt-4 {
    margin-top: 1rem; 
}


</style>


