<script lang="ts">
import {defineComponent} from 'vue'


export default defineComponent({
  name: "AddNewProject",

  props: {
    text: {
      type: String,
      required: true
    },
    project_manager: {
      type: String,
      required: true
    },
    project_id: {
      type: String,
      required: true
    },
    }
  },
)
</script>

<template>

  <RouterLink :to="'/addproject/' + project_id">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">

      <div class="grid grid-cols-2">
        <h3 class="font-bold dark:text-white">{{ text }}</h3>
        <div class="inline-block text-right">
        </div>
      </div>


      <code>project_id: {{ project_id }}</code>

  <!--    <p>-->
  <!--      {{ project_manager }}-->
  <!--    </p>-->

    </div>
  </RouterLink>

</template>

<style scoped>

</style>