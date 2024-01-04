<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ProjectListItem",

  props: {
    projectName: {
      type: String,
      required: true
    },
    projectManager: {
      type: Array,
      required: true
    },
    identifier: {
      type: String,
      required: true
    }
  },
})
</script>

<template>
  <RouterLink :to="'/projects/' + identifier">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">
      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ projectName }}</h3>
        <div class="inline-block text-right">
          <span>Manager(s): {{ projectManager.join(', ') }}</span>
        </div>
      </div>

      <code>Project ID: {{ identifier }}</code>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>