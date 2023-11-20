<script setup lang="ts">

import Navbar from "./components/Navbar.vue";

import { useStore } from "./store.ts";
import { storeToRefs } from 'pinia'
const useStore1 = useStore()
const { getUser, isLoggedIn } = storeToRefs(useStore1)

</script>

<template>
  <div>


    <Navbar :user="getUser" :is-logged-in="isLoggedIn" class="mb-10" />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>

</template>

<style scoped>

</style>
