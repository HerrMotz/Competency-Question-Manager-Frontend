<script lang="ts">
import {defineComponent} from 'vue'
import {StarIcon} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "StarComponent",
  components: {StarIcon},
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
})
</script>

<template>
  <StarIcon v-for="_ in rating" class="h-5 w-5 text-yellow-500 inline" aria-hidden="true"/>
  <StarIcon v-for="_ in (5 - rating)" class="h-5 w-5 text-gray-500 inline" aria-hidden="true"/>
</template>

<style scoped>

</style>