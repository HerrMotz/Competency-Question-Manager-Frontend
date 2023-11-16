<script lang="ts">
import {defineComponent} from 'vue'

import { StarIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: "CompetencyQuestionListItem",

  props: {
    text: String,
    identifier: Number,
    creator: String,
    rating: Number
  },

  components: {StarIcon}
})
</script>

<template>

  <div class="bg-gray-700 mt-10 rounded p-4 text-left">

    <div class="grid grid-cols-2">
      <h3 class="font-bold">{{ text }}</h3>
      <div class="inline-block text-right">
        <StarIcon v-for="_ in rating" class="h-5 w-5 text-yellow-500 inline" aria-hidden="true" />
      </div>
    </div>


    <code>identifier: {{ identifier }}</code>

    <p>
      {{ creator }}
    </p>

  </div>

</template>

<style scoped>

</style>