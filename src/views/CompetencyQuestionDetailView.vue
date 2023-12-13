<script setup lang="ts">
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import Comment from "../components/CommentComponent.vue";
import {ref, watch} from "vue";
import {StarIcon, TrashIcon, ArrowDownOnSquareIcon, PaperAirplaneIcon} from "@heroicons/vue/24/solid";
import {DialogPanel, Popover, PopoverButton, PopoverPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import StarComponent from "../components/StarComponent.vue";
import SubmitButtonWithCallback from "../components/SubmitButtonWithCallback.vue";

const props = defineProps(['id'])

const messagePopupData = ref({
  uxresponse: {
    title: "",
    messageType: "",
    text: "",
    detail: "",
  },
  open: false
})

const timeoutDuration = 1000
const starsAreHovered = ref(false);
const timeout = ref();
const open = ref(false);

const cq = ref();

watch(starsAreHovered, (newValue, _) => {
  if (newValue) {
    clearTimeout(timeout.value);
    open.value = true;
  } else {
    timeout.value = setTimeout(() => {
      open.value = false;
    }, timeoutDuration);
  }
})

const response = await CompetencyQuestionDataService.getOne(props.id);

if ("messageType" in response) {
  messagePopupData.value.uxresponse = {
    ...messagePopupData.value.uxresponse,
    ...response
  };
  messagePopupData.value.open = true;

} else {
  cq.value = response;
  console.log(cq.value.data)
}
</script>

<template>
  <div class="w-1/2 mx-auto">
    <MessagePopup :uxresponse="messagePopupData.uxresponse"
                  :open="messagePopupData.open"
                  @close="messagePopupData.open = false;"/>
    <h1 class="text-2xl">
      Competency Question Detail View
    </h1>

    <div>
      <div class="my-3">
        <div class="float-right">
          Topic: <span class="underline decoration-sky-500 mr-5">Topping</span>
          <span class="inline-block text-right ml-2"
                @mouseover="starsAreHovered = true"
                @mouseleave="starsAreHovered = false">
                <StarComponent :rating="cq.data.rating"/>
            <br>
            <Popover class="relative inline-block ml-6" v-slot="{open}">
              <PopoverButton>Show Ratings</PopoverButton>
              <div v-if="open">
                <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel static
                                class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                    <div
                        class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div class="p-4">
                        <div
                            v-for="item in [{name: 'Chiara Tunc', rating: 4}, {name: 'Malte Weber', rating: 1}]"
                            :key="item.name"
                            class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <div>
                            <span class="mr-5 text-gray-600">{{ item.name }} </span>
                            <div class="-mt-1 inline">
                              <StarComponent :rating="item.rating"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </div>
            </Popover>
          </span>

        </div>
        <span class="inline-flex items-center rounded-md dark:bg-blue-400/10 px-2 py-1 text-xs font-medium dark:text-blue-400 ring-1 ring-inset dark:ring-blue-400/30
                    bg-blue-50 text-blue-700 ring-blue-700/10">
          Version: {{ cq.data.version }}
        </span>
      </div>
      <label for="question"
             class="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Question</label>
      <div class="mt-2">
        <input type="text" name="question" id="question"
               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               :value="cq.data.question"
        />
      </div>
      <div class="mt-5 flex flex-row-reverse">
        <button type="button"
                class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <ArrowDownOnSquareIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
          Save
        </button>
        <div class="mr-5">
          <SubmitButtonWithCallback agree-button-text="Delete the question"
                                  title="Are you sure you want to delete the question?"
                                  detail="This action is permanent. All comments, ratings and consolidations will be deleted."
                                  @modalsuccessclose="CompetencyQuestionDataService.delete(cq.data.id); $router.push('/questions/');">
            <TrashIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
            Delete
          </SubmitButtonWithCallback>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <h1 class="text-xl">Comments</h1>
      <div>
        <div class="mt-2">
          <textarea rows="3" name="comment" placeholder="Add new comment..." id="comment"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          <button type="button"
                  class="float-right inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5">
            <PaperAirplaneIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
            Comment
          </button>
        </div>

        <Comment text="Diese Frage ist irgendwie trivial." user="Daniel Motz" :timestamp="Date.now()"/>
        <Comment text="Removed message." user="Daniel Motz" :timestamp="Date.now()" :system-message="true"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>