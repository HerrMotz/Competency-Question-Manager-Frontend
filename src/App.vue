<script setup lang="ts">

import Navbar from "./components/Navbar.vue";

import { useStore } from "./store.ts";
import { storeToRefs } from 'pinia'
const useStore1 = useStore()
const { getUser, isLoggedIn } = storeToRefs(useStore1)

</script>

<template>
  <div class="min-h-screen">


    <Navbar v-if="isLoggedIn" :user="getUser" :is-logged-in="isLoggedIn" class="mb-10" />

    <main class="pb-10 pt-7 min-h-screen dark:bg-gray-800 dark:text-gray-100" :class="[isLoggedIn ? 'lg:pl-72' : '']">
      <div class="px-4 sm:px-6 lg:px-8">
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
    </main>
  </div>

</template>

<style scoped>

</style>
