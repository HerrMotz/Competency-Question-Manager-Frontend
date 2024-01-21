<script lang="ts">
import {defineComponent, PropType} from 'vue'
import UserCardSmall from "./UserCardSmall.vue";
import CompetencyQuestionListItem from "./CompetencyQuestionListItem.vue";
import {PlusIcon} from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "ConsolidationListItem",

  props: {
    consolidation: {
      type: Object as PropType<ConsolidationT>,
      required: true,
    },
  },

  components: {CompetencyQuestionListItem, UserCardSmall, PlusIcon}
})
</script>

<template>

  <RouterLink :to="'/consolidations/' + consolidation.id">
    <div class="dark:bg-gray-700 dark:text-gray-200 bg-gray-100 mt-10 rounded p-4 text-left">

      <h3 class="font-bold dark:text-white">{{ consolidation.name ? consolidation.name : 'No name given' }}</h3>
      <h4 class="mt-5">Questions</h4>
      <div class="mb-10">
        <div class="mt-3 dark:bg-gray-600 hover:dark:bg-gray-600 p-1 pl-3 rounded hover:bg-gray-200" v-for="cq in consolidation.questions">
          <CompetencyQuestionListItem class="max-w-xl"
                                      :text="cq.question"
                                      :identifier="cq.id"/>
        </div>
        <button class="mt-3 w-full flex items-center justify-center dark:bg-gray-600 hover:dark:bg-gray-500 p-1 pl-3 rounded hover:bg-gray-200">
            <PlusIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>


      <UserCardSmall class="mt-3" :name="consolidation.engineer.name" :email="consolidation.engineer.email">
        <div class="mr-5">Consolidated by</div>
      </UserCardSmall>

    </div>
  </RouterLink>

</template>

<style scoped>

</style>