<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "UserCardSmall",

  props: {
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
        <p class="font-medium text-gray-700 dark:text-gray-300">{{ email }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>

</style>