<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: "TermListItem",

  props: {
    term: {
      type: Object as PropType<TermT>,
      required: true
    },
  },
})
</script>

<template>
  <RouterLink :to="'/terms/' + term.projectId + '/' + term.id">
    <div class="mt-3 dark:bg-gray-600 hover:dark:bg-gray-600 p-1 pl-3 rounded hover:bg-gray-200">
      {{term.content}}
    </div>
  </RouterLink>
</template>

<style scoped>

</style>