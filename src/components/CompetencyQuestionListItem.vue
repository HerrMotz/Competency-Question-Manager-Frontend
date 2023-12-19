<script lang="ts">
import {defineComponent} from 'vue'

import { StarIcon } from '@heroicons/vue/24/solid'
import StarComponent from "./StarComponent.vue";

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

  components: {StarComponent, StarIcon}
})
</script>

<template>

  <RouterLink :to="'/questions/' + identifier">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">

      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ text }}</h3>
        <div class="inline-block text-right">
          <StarComponent :rating="rating" />
        </div>
      </div>


      <code>identifier: {{ identifier }}</code>

  <!--    <p>-->
  <!--      {{ creator }}-->
  <!--    </p>-->

    </div>
  </RouterLink>

</template>

<style scoped>

</style>