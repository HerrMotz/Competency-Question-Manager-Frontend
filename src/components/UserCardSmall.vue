<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "UserCardSmall",

  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    }
  },
})
</script>

<template>
  <a href="#" class="group block flex-shrink-0">
    <div class="flex items-center">
      <slot></slot>
      <div>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">{{ name }}</p>
        <p class="text-xs font-medium text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">{{ email }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>

</style>