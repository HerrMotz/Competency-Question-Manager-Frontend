<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: "CompetencyQuestionListItem",

  props: {
    consolidation: {
      type: Object as PropType<ConsolidationT>,
      required: true,
    },
  },

  components: {}
})
</script>

<template>

  <RouterLink :to="'/consolidations/' + consolidation.id">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">

      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ consolidation.name }}</h3>
      </div>


      <code>identifier: {{ consolidation.engineerName }} {{ consolidation.engineerEmail }}</code>

  <!--    <p>-->
  <!--      {{ creator }}-->
  <!--    </p>-->

    </div>
  </RouterLink>

</template>

<style scoped>

</style>