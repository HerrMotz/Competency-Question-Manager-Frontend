<script setup lang="ts">
import {Ref, ref, UnwrapRef} from "vue";
import draggable from 'vuedraggable'

type WordT = {
  index: Number,
  text: String,
  isNew: Boolean
}

const words: Ref<UnwrapRef<(WordT)[]>> = ref([
  {index: 1, text: "This", isNew: true},
  {index: 2, text: "is", isNew: true},
  {index: 3, text: "an", isNew: true},
  {index: 4, text: "example", isNew: true},
  {index: 5, text: "sentence", isNew: true},
  {index: 6, text: ".", isNew: true}
]);

const drag = ref(false);
</script>

<template>
  <div>
    <draggable
        class="flex gap-4"
        v-model="words"
        group="people"
        @start="drag=true"
        @end="drag=false"
        item-key="id">
      <template #item="{word}">
        <div class="items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset"
             :class="word.isNew ? 'bg-green-50 text-green-600 ring-green-500/10' : 'bg-gray-50 text-gray-600 ring-ray-500/10'">
          {{ word.text }}
          <button type="button"
                  class="group relative -mr-1 h-3.5 w-3.5 rounded-sm"
                  :class="word.isNew ? 'hover:bg-green-500/20' : 'hover:bg-gray-500/20'"
                  @click="words.splice(words.findIndex(e => e.index === word.index), 1)">
            <span class="sr-only">Remove</span>
            <svg viewBox="0 0 14 14"
                 class="h-3.5 w-3.5"
                 :class="word.isNew ? 'stroke-green-600/50 group-hover:stroke-green-600/75' : 'stroke-gray-600/50 group-hover:stroke-gray-600/75'">
              <path d="M4 4l6 6m0-6l-6 6"/>
            </svg>
            <span class="absolute -inset-1"/>
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>

</style>