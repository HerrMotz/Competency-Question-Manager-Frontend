<script lang="ts">
import {defineComponent} from 'vue'

import { StarIcon } from '@heroicons/vue/24/solid'
import StarComponent from "./StarComponent.vue";
import UserCardSmall from "./UserCardSmall.vue";

export default defineComponent({
  name: "CompetencyQuestionListItem",

  props: {
    text: {
      type: String,
      required: true
    },
    creator: {
      type: String,
    },
    identifier: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
    },
    cardStyle: {
      type: Boolean,
      required: false
    },
    groupIdentifier: {
      type: String,
      required: true,
    }
  },

  components: {UserCardSmall, StarComponent, StarIcon}
})
</script>

<template>

  <RouterLink :to="'/questions/' + groupIdentifier +  '/' + identifier">
    <div class="text-left" :class="cardStyle ? 'bg-gray-100 rounded p-4 dark:bg-gray-700 dark:text-gray-200 mt-10' : ''">

      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ text }}</h3>
        <div v-if="rating" class="inline-block text-right">
          <StarComponent :rating="rating" />
        </div>
      </div>


      <code>identifier: {{ identifier }}</code>

      <UserCardSmall v-if="creator" :name="creator" />

    </div>
  </RouterLink>

</template>

<style scoped>

</style>