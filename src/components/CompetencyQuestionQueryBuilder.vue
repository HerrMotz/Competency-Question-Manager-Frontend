<script setup lang="ts">
import {Ref, ref, UnwrapRef} from "vue";
import draggable from 'vuedraggable'
import {CheckCircleIcon} from "@heroicons/vue/24/solid";

type WordT = {
  index: Number,
  text: String,
  isNew: Boolean
}

const words = ref([
  {initialIndex: 0, text: "This", isNew: false},
  {initialIndex: 1, text: "is", isNew: true},
  {initialIndex: 2, text: "an", isNew: true},
  {initialIndex: 3, text: "example", isNew: true},
  {initialIndex: 4, text: "sentence", isNew: true},
  {initialIndex: 6, text: ".", isNew: true}
]);

const newIndex = ref(words.value.length)
const addWordInput = ref("");

function insertWord(word:string) {
  words.value.push({
    "initialIndex": newIndex.value,
    text: word,
    isNew: true
  })
  newIndex.value++;
  addWordInput.value = "";
}

const drag = ref(false);
</script>

<template>
  <div>
    <draggable
        v-model="words"
        class="flex flex-wrap gap-4"
        @start="drag=true"
        @end="drag=false"
        item-key="id">
      <template #item="{element}">
        <div class="items-center rounded-md px-2 py-1 mx-auto font-medium ring-1 ring-inset"
             :class="element.isNew ? 'bg-green-50 text-green-600 ring-green-500/10' : 'bg-gray-50 text-gray-600 ring-ray-500/10'">
          {{ element.text }}
          <button type="button"
                  class="group relative -mr-1 h-3.5 w-3.5 rounded-sm"
                  :class="element.isNew ? 'hover:bg-green-500/20' : 'hover:bg-gray-500/20'"
                  @click="words.splice(words.findIndex(e => e.initialIndex === element.initialIndex), 1)">
            <span class="sr-only">Remove</span>
            <svg viewBox="0 0 14 14"
                 class="h-3.5 w-3.5"
                 :class="element.isNew ? 'stroke-green-600/50 group-hover:stroke-green-600/75' : 'stroke-gray-600/50 group-hover:stroke-gray-600/75'">
              <path d="M4 4l6 6m0-6l-6 6"/>
            </svg>
            <span class="absolute -inset-1"/>
          </button>
        </div>
      </template>
    </draggable>
    <div class="flex mt-5">
      <div class="grow mr-5">
        <label for="search" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
          Add word to sentence
        </label>
        <div class="relative mt-2 flex items-center">
          <input type="text" name="search" id="search"
                 v-model="addWordInput"
                 @keyup.enter="insertWord(addWordInput);"
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
                @click="insertWord(addWordInput);"
                class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true"/>
          Add word
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>