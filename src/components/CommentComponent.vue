<script lang="ts">
import {defineComponent} from 'vue'
import moment from "moment";

export default defineComponent({
  name: "Comment",

  props: {
    user: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    systemMessage: {
      type: Boolean,
    }
  },

  methods: {
    moment(date: Date) {
      return moment(date).format("DD.MM.YYYY HH:mm:ss")
    },
  },
})
</script>

<template>
  <div class="border-b dark:border-gray-100 border-gray-800 mt-5 p-2 pb-8">
    <span v-if="!systemMessage" class="font-bold block">{{ user }}</span>
    <p :class="[systemMessage ? 'dark:text-gray-500 text-gray-500' : 'dark:text-gray-200 text-gray-800 mt-2']">
      {{ text }}
    </p>
    <span class="text-xs font-light dark:text-gray-100 text-gray-800">{{ moment(timestamp) }}</span>
  </div>
</template>

<style scoped>

</style>