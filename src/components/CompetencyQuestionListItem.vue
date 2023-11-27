<script lang="ts">
import {defineComponent} from 'vue'

import { StarIcon } from '@heroicons/vue/24/solid'

export default defineComponent({
  name: "CompetencyQuestionListItem",

  props: {
    text: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      required: true
    },
    identifier: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },

  components: {StarIcon}
})
</script>

<template>

  <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">

    <div class="grid grid-cols-2">
      <h3 class="font-bold dark:text-white">{{ text }}</h3>
      <div class="inline-block text-right">
        <StarIcon v-for="_ in rating" class="h-5 w-5 text-yellow-500 inline" aria-hidden="true" />
        <StarIcon v-for="_ in (5 - rating)" class="h-5 w-5 text-gray-500 inline" aria-hidden="true" />
      </div>
    </div>


    <code>identifier: {{ identifier }}</code>

<!--    <p>-->
<!--      {{ creator }}-->
<!--    </p>-->

  </div>

</template>

<style scoped>

</style>