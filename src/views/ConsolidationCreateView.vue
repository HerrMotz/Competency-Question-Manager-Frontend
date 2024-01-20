<script lang="ts">
import {defineComponent} from 'vue'
import MessagePopup from "../components/MessagePopup.vue";
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import ConsolidationDataService from "../services/ConsolidationDataService.ts";
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";

export default defineComponent({
  name: "ConsolidationCreateView",
  components: {MessagePopup, ExclamationCircleIcon},
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

      groups: [
        {name: "Gruppe 1", uuid: "3"},
        {name: "Gruppe 2", uuid: "100"}
      ],

      cqs: [],
      consolidationName: "",
      selectedQuestions: [],

      nameError: false,

    }
  },
  mounted() {
    this.getCompetencyQuestions()
  },

  computed: {
    indeterminate() {
      return this.selectedQuestions.length > 0 && this.selectedQuestions.length < this.cqs.length
    }
  },

  methods: {
    async getCompetencyQuestions()  {
      const response = await CompetencyQuestionDataService.getAll();
      console.log(response)

      if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response
        };
        this.messagePopupData.open = true;

      } else {
        // successful
        this.cqs = response.data;
        console.log(this.cqs)
      }
    },

    async save() {
      if (this.selectedQuestions.length < 2) {
        this.messagePopupData.uxresponse = {
          title: "Not enough questions selected",
          messageType: "warning",
          text: "Only two or more questions can be consolidated.",
        };
        this.messagePopupData.open = true;
        return
      }

      if (this.consolidationName.length < 1) {
        this.nameError = true;
        setTimeout(() => this.nameError = false, 10000)
        return;
      }

      const response = await ConsolidationDataService.add(this.consolidationName, this.selectedQuestions);

      if ("messageType" in response) {
        this.messagePopupData.uxresponse = {
          ...this.messagePopupData.uxresponse,
          ...response
        };
        this.messagePopupData.open = true;

      } else {
        // successful
        this.$router.push('/consolidations/');
      }
    }
  }
})
</script>

<template>
  <div class="w-2/3 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse"
                  :open="messagePopupData.open"
                  @close="messagePopupData.open = false;"/>
    <h1 class="text-2xl">
      Consolidate Questions
    </h1>

    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <p class="mt-2 text-sm text-gray-700 dark:text-gray-300 mb-5">
            This view allows to consolidate question into one new
            question. Select the questions you want to consolidate in the table below, enter a name in the input field
            and click "Consolidate".
          </p>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Consolidated Question</label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input type="text" v-model="consolidationName" class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" :class="nameError ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' : ''" aria-invalid="true" aria-describedby="email-error" />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon v-if="nameError" class="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        </div>
        <p class="mt-2 text-sm text-red-600" id="email-error" v-if="nameError">Please enter a name.</p>
      </div>

      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="relative">
              <div v-if="selectedQuestions.length > 0" class="absolute left-14 top-0 flex h-12 items-center space-x-3 sm:left-12">
                <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        @click="save()">
                  Consolidate
                </button>
              </div>
              <table class="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="indeterminate || selectedQuestions.length === cqs.length" :indeterminate="indeterminate" @change="selectedQuestions = $event.target.checked ? cqs.map((p) => p.id) : []" />
                  </th>
                  <th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Group</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Question</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Topic</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="cq in cqs" :key="cq.id" :class="[selectedQuestions.includes(cq.id) && 'bg-gray-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <div v-if="selectedQuestions.includes(cq.id)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
                    <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :value="cq.id" v-model="selectedQuestions" />
                  </td>
                  <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedQuestions.includes(cq.id) ? 'text-indigo-600' : 'text-gray-900']">
                    {{ cq.question }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ cq.question }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ cq.question }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ cq.question }}
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <RouterLink :to="`/questions/${cq.id}`" class="text-indigo-600 hover:text-indigo-900">
                      Edit<span class="sr-only">, {{ cq.question }}</span>
                    </RouterLink>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>