<script setup lang="ts">
import {defineProps, ref} from "vue";
import {ArrowDownOnSquareIcon, CheckCircleIcon, TrashIcon} from "@heroicons/vue/24/solid";
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import SubmitButtonWithCallback from "./SubmitButtonWithCallback.vue";
import TermDataService from "../services/TermDataService.ts";
import MessagePopup from "./MessagePopup.vue";

const words = ref<AnnotationT[]>([]);

const newIndex = ref(words.value.length)
const addWordInput = ref("");
const addPassageInput = ref("");

const messagePopupData = ref({
  uxresponse: {
    title: "",
    messageType: "",
    text: "",
    detail: "",
  },
  open: false
})

function insertTermPassagePair() {
  TermDataService.add(props.id, words.value).then(response => {
    if ("messageType" in response) {
      messagePopupData.value.uxresponse = {
        ...messagePopupData.value.uxresponse,
        ...response
      };
      messagePopupData.value.open = true;

    } else {
      words.value.push({
        term: addWordInput.value,
        passage: addPassageInput.value,
      })
      newIndex.value++;
      addWordInput.value = "";
      addPassageInput.value = "";
      emits('fetchCompetencyQuestion');
    }
  })
}

const props = defineProps(['question', 'annotations', 'canEdit', 'groupId', 'id', 'projectId'])
const emits = defineEmits(['saveEvent', 'fetchCompetencyQuestion'])

words.value = props.annotations.map(e => ({passage: e.content, term: e.term}));
</script>

<template>
  <MessagePopup :uxresponse="messagePopupData.uxresponse"
                :open="messagePopupData.open"
                @close="messagePopupData.open = false;"/>
  <div>
    <label for="question"
           class="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Question</label>
    <div class="mt-2">
      <input type="text" name="question" id="question"
             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             v-model="props.question"
      />
    </div>
    <h3 class="mt-10 mb-5 text-xl">Term Annotations</h3>
    <p class="mt-2 text-sm text-gray-700 dark:text-gray-300 mb-5">
      This section allows you to add terms to a question. If a certain term does not exist yet, it will be created.
      Questions that contain the same terms can be found via the
      <RouterLink to="/terms" class="font-bold underline decoration-blue-500 decoration-2 dark:text-slate-200">Terms
      </RouterLink>
      overview.
    </p>

    <div v-for="element in words"
         class="items-center rounded-md my-4 px-2 py-1 mx-auto font-medium ring-1 ring-inset bg-gray-50 text-gray-600 ring-ray-500/10">
      Term: <RouterLink class="font-bold underline decoration-blue-500 decoration-2 text-blue-500" :to="'/terms/'+props.projectId+'/'+element.term.id">{{ element.term.content }}</RouterLink>, Passage: {{ element.passage }}
      <button type="button"
              class="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20 float-right"
              @click="words.splice(words.findIndex(e => e.term === element.term && e.passage === element.passage), 1)">
        <span class="sr-only">Remove</span>
        <svg viewBox="0 0 14 14"
             class="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
          <path d="M4 4l6 6m0-6l-6 6"/>
        </svg>
        <span class="absolute -inset-1"/>
      </button>
    </div>
    <div class="flex mt-5">
      <div class="grow mr-5">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Add term to question
        </label>
        <div class="relative mt-2 flex items-center">
          <input type="text" ref="word"
                 placeholder="Word"
                 v-model="addWordInput"
                 @keyup.enter="$refs.passage.focus()"
                 class="block w-full mr-5 rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <input type="text" ref="passage"
                 placeholder="Passage"
                 v-model="addPassageInput"
                 @keyup.enter="insertTermPassagePair();"
                 class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <kbd class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
              ↵ ENTER
            </kbd>
          </div>
        </div>
      </div>
      <div class="mt-auto">
        <button type="button"
                @click="insertTermPassagePair();"
                class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
        </button>
      </div>
    </div>
  </div>
  <div v-if="canEdit" class="mt-5 flex flex-row-reverse">
    <button
        @click="$emit('saveCompetencyQuestion', props.question, words)"
        type="button"
        class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
      Save
    </button>
    <div class="mr-5" v-if="$props.id && $props.groupId">
      <SubmitButtonWithCallback agree-button-text="Delete the question"
                                title="Are you sure you want to delete the question?"
                                detail="This action is permanent. All comments, ratings and consolidations will be deleted."
                                @modalsuccessclose="CompetencyQuestionDataService.delete(props.id, props.groupId); $router.push('/questions/');">
        <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
        Delete
      </SubmitButtonWithCallback>
    </div>
  </div>
</template>

<style scoped>

</style>