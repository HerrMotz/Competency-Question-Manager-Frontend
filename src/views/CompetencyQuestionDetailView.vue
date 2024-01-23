<script setup lang="ts">
import CompetencyQuestionDataService from "../services/CompetencyQuestionDataService.ts";
import MessagePopup from "../components/MessagePopup.vue";
import {computed, ref, watch} from "vue";
import {TrashIcon, ArrowDownOnSquareIcon, PaperAirplaneIcon} from "@heroicons/vue/24/solid";
import {DialogPanel, Popover, PopoverButton, PopoverPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import StarComponent from "../components/StarComponent.vue";
import SubmitButtonWithCallback from "../components/SubmitButtonWithCallback.vue";
import CommentComponent from "../components/CommentComponent.vue";

const props = defineProps(['id', 'groupid'])

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
const stats = ref();

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

fetchCompetencyQuestion();

async function fetchCompetencyQuestion() {
  CompetencyQuestionDataService.getOne(props.id, props.groupid).then(response => {
    if ("messageType" in response) {
      messagePopupData.value.uxresponse = {
        ...messagePopupData.value.uxresponse,
        ...response
      };
      messagePopupData.value.open = true;

    } else {
      cq.value = response;
      console.log(cq.value.data)

      stats.value = [
        {name: "Author", value: cq.value.data.author.name},
        {name: "№ Cons.", value: cq.value.data.consolidations.length},
        {name: "Project", value: cq.value.data.group.project.name},
        {name: "Group", value: cq.value.data.group.name}
      ]

    }
  });
}
</script>

<template>
  <div v-if="cq && messagePopupData.open===false"
       class="w-1/2 mx-auto">
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
                @mouseleave="starsAreHovered = false"> <!-- this hovering mechanism is WIP -->
                <StarComponent v-if="cq"
                               :rating="cq.data.aggregatedRating"
                               :question_id="cq.data.id"
                               @afterRating="fetchCompetencyQuestion();"/>
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
            <!-- TODO check what happens on overflow, with many cq ratings -->

                    <div
                        class="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div class="p-4">
                        <div
                            v-for="item in cq.data.ratings"
                            :key="item.id"
                            class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                          <span class="mr-5 w-1/2 text-ellipsis text-gray-600">{{ item.user.name }}</span>
                          <div class="-mt-1 inline w-1/2">
                            <StarComponent :rating="item.rating"/>
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
        <!--        <span class="inline-flex items-center rounded-md dark:bg-blue-400/10 px-2 py-1 text-xs font-medium dark:text-blue-400 ring-1 ring-inset dark:ring-blue-400/30-->
        <!--                    bg-blue-50 text-blue-700 ring-blue-700/10">-->
        <!--          Version: {{ cq.data.version }}-->
        <!--        </span>-->
      </div>
      <div>
        <label for="question"
               class="block text-sm font-medium leading-6 dark:text-gray-200 text-gray-900">Question</label>
        <div class="mt-2">
          <input type="text" name="question" id="question"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 :value="cq.data.question"
          />
        </div>
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

      <div class="bg-gray-900 mt-5">
        <div class="mx-auto max-w-7xl">
          <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.name" class="bg-gray-700 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                <span class="text-xl font-semibold tracking-tight text-white">{{ stat.value }}</span>
                <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <CommentComponent :question-id="cq.data.id" :comments="cq.data.comments" @refresh="fetchCompetencyQuestion()"/>
    </div>


  </div>
  <div v-else class="w-1/2 mx-auto animate-pulse">
    <div class="grid grid-cols-2 gap-4">
      <div class="h-8 border-1 shadow rounded-md p-4 dark:bg-gray-700
                dark:text-gray-200 bg-gray-100"></div>
    </div>
    <StarComponent :rating="0" :ignore_zero_rating="true" class="float-right mt-4"/>
    <div class="h-80
                border-1 shadow rounded-md p-4 max-w-xl dark:bg-gray-700
                dark:text-gray-200 bg-gray-100 mt-16"></div>
  </div>
</template>

<style scoped>

</style>