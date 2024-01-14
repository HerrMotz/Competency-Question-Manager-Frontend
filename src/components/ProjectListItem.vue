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
  identifier: {
    type: String,
    required: true
  }
},
})
</script>

<template>
  <RouterLink :to="'/projects/' + identifier"> 
    <div key="project-list-item" class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">
      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ name }}</h3>
        <div class="inline-block text-right">
          <span>Project Manager(s): {{ [...(managers || []), ...(engineers || [])].join(', ') }}</span>

        </div>
      </div>

      <code>Project ID: {{ identifier }}</code>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>