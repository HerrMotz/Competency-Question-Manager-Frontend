<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GroupListItem",

  props: {
    name: {
      type: String,
      required: true
    },
    members: {
      type: Number,
      required: true
    },
    group_id: {
      type: String,
      required: true
    }
  },
})
</script>

<template>
  <RouterLink :to="'/groups/' + group_id">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">
      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ name }}</h3>
        <div class="inline-block text-right">
          <span>Group Members: {{ members }}</span>
        </div>
      </div>

      <code>Group ID: {{ group_id }}</code>

    </div>
  </RouterLink>
</template>

<style scoped>

</style>