<script setup lang="ts">

import Navbar from "./components/Navbar.vue";

import { useStore } from "./store.ts";
import { storeToRefs } from 'pinia'
import {computed} from "vue";
import {useRoute} from "vue-router";
const useStore1 = useStore()
const { isLoggedIn } = storeToRefs(useStore1)

const route = useRoute();

const showNavbar = computed(() =>  {
  return isLoggedIn && route.path !== '/' && route.path !== '/login'
})

</script>

<template>
  <div class="min-h-screen">


    <Navbar v-if="showNavbar"/>

    <main class="pb-10 pt-7 min-h-screen dark:bg-gray-800 dark:text-gray-100" :class="[showNavbar ? 'lg:pl-72' : '']">
      <div class="px-4 sm:px-6 lg:px-8">
        <Suspense>

          <RouterView :key="$route.fullPath" />
        </Suspense>
      </div>
    </main>
  </div>

</template>

<style scoped>

</style>
