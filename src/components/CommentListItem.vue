<script lang="ts">
import {defineComponent, PropType} from 'vue'

export default defineComponent({
  name: "CommentListItem",

  props: {
    comment: {
      type: Object as PropType<CommentT>,
      required: true
    },
  },
})
</script>

<template>
<!-- TODO systemMessage -->
<!-- <div class="border-b dark:border-gray-100 border-gray-800 mt-5 p-2 pb-8">-->
<!--    <span v-if="!systemMessage" class="font-bold block">{{ user }}</span>-->
<!--    <p :class="[systemMessage ? 'dark:text-gray-500 text-gray-500' : 'dark:text-gray-200 text-gray-800 mt-2']">-->
<!--      {{ text }}-->
<!--    </p>-->
<!--    <span class="text-xs font-light dark:text-gray-100 text-gray-800">{{ moment(timestamp) }}</span>-->
<!--  </div>-->
  <div class="pt-10">
    <h3 class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ comment.author.name }}</h3>
    <div class="mt-3 space-y-6 text-sm text-gray-600 dark:text-gray-400" v-html="comment.comment" />
    <time :datetime="comment.createdAt" class="text-sm ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">{{ comment.createdAt }}</time>
  </div>
</template>

<style scoped>

</style>