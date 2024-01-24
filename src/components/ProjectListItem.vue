<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ProjectListItem",

  props: {
    name: {
      type: String,
      required: true
    },
    engineers: {
      type: Array,
      required: false
    },
    managers: {
      type: Array,
      required: false
    },
    project_id: {
      type: String,
      required: true
    }
},
})
</script>

<template>
  <RouterLink :to="'/projects/' + project_id">
    <div key="project-list-item" class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">
      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ name }}</h3>
        {{ managers }}
        <div class="inline-block text-right">
          <span>Project Manager(s): {{ [...(managers || []), ...(engineers || [])].join(', ') }}</span>

        </div>
      </div>

      <code>Project ID: {{ project_id }}</code>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>