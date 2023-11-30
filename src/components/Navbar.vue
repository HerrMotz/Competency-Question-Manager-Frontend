<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {UserT} from "../interfaces/User.ts";

import {
  Dialog, DialogPanel, TransitionChild, TransitionRoot
} from '@headlessui/vue'

import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
  ListBulletIcon
} from '@heroicons/vue/24/outline'

export default defineComponent({
  name: "Navbar",

  props: {
    user: {
      type: Object as PropType<UserT>,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },

  components: {
    Dialog,
    DialogPanel,
    Bars3Icon,
    ChartPieIcon,
    XMarkIcon,
    ListBulletIcon,
    TransitionChild,
    TransitionRoot,
  },

  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },

  data() {
    return {
      sidebarOpen: false,

      teams: [
        { id: 1, name: 'Group 1', href: '#', initial: 'H', current: false },
        { id: 2, name: 'Group 2', href: '#', initial: 'T', current: false },
        { id: 3, name: 'Group 3', href: '#', initial: 'W', current: false },
      ],

      navigation: [
        { name: 'Competency Questions', href: '/questions', icon: ListBulletIcon, current: false },
        { name: 'Team', href: '/team', icon: UsersIcon, current: false },
        { name: 'Projects', href: '/projects', icon: FolderIcon, current: false },
        { name: 'Reports', href: '/reports', icon: ChartPieIcon, current: false },
      ],
    }
  }
})
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
              <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <RouterLink :to="item.href" :class="[item.href === currentRouteName ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                          <component :is="item.icon" :class="[item.href === currentRouteName ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                          {{ item.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <li v-for="team in teams" :key="team.name">
                        <a :href="team.href" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                          <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ team.initial }}</span>
                          <span class="truncate">{{ team.name }}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
      <div class="flex h-16 shrink-0 items-center">
        <span class="text-2xl font-bold text-white mt-5">
          <svg class="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.7 84.5">
            <path class="fill-amber-100 stroke-amber-100" d="m29.8,0c7,0,13.7,1.8,18,3.9v13.3h-1.9c-3.6-2.4-9-4.7-14.4-4.7-11,0-17.7,7.5-17.7,20.5s6.2,21,16.5,21c4.3,0,8.9-1.5,12.9-4.3h1.9l4.4,11.6c-6.6,3.8-14.9,4.9-20.3,4.9C9.8,66.2,0,52.2,0,33.2S10.4,0,29.8,0Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m90.6,40.5c1.3-1.7,2-4.6,2-7.7,0-11.6-2.5-21.4-11.4-21.4s-11.4,9.8-11.4,21.4,2,22.5,11.4,22.5h1l-5.3-11.5v-1.8l8.7-4,15.8,33.9v1.8l-8.8,3.6-5.5-11.8c-1.9.4-3.8.7-5.9.7-17.6,0-25.2-14.4-25.2-33.4S63.7,0,81.2,0s25.2,13.8,25.2,32.8c0,10.4-2.7,20.1-7.7,25.8l-8.1-18.1Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m118.3,30.1h37.7v11.6h-37.7v-11.6Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m169.4,1.4h14.6l9.3,29.6,9.3-29.6h14.4v63h-11.9V31.1l1-11.9-.3-.1-7.6,22.9h-9.8l-7.8-22.9-.3.1,1,10.4v34.8h-11.9V1.4Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m260.5,59.8c-3.4,3.2-10,6.1-16.6,6.1-11.3,0-17.6-5.8-17.6-14.3,0-10.5,9.5-14.7,21.4-14.7h9.5v-1.4c0-4.7-3-8.7-11.1-8.7-4.6,0-10,1.4-13.5,3h-1.8v-9.9c3.6-1.5,10.1-3.3,17.4-3.3,16.4,0,21.6,8.9,21.6,22.4v25.5h-7l-2.3-4.7Zm-3.3-7.8v-7.1h-10.3c-5.3,0-8.4,1.8-8.4,5.4s2.9,5.5,7.6,5.5c3.6,0,8-1.7,11.1-3.8Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m313.8,64.4v-27.8c0-5.6-1.7-8.4-6.7-8.4-3.8,0-7.7,1.6-10.5,3v33.2h-13V18.4h6.2l2.2,4.1c3.5-2.6,10.5-5.9,17.2-5.9,13.5,0,17.6,9.1,17.6,20.5v27.3h-13Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m372.5,59.8c-3.4,3.2-10,6.1-16.6,6.1-11.3,0-17.6-5.8-17.6-14.3,0-10.5,9.5-14.7,21.4-14.7h9.5v-1.4c0-4.7-3-8.7-11.1-8.7-4.6,0-10,1.4-13.5,3h-1.8v-9.9c3.6-1.5,10.1-3.3,17.4-3.3,16.4,0,21.6,8.9,21.6,22.4v25.5h-7l-2.3-4.7Zm-3.3-7.8v-7.1h-10.3c-5.3,0-8.4,1.8-8.4,5.4s2.9,5.5,7.6,5.5c3.6,0,8-1.7,11.1-3.8Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m425.8,63.7v-5.2c-1.7,2-5.4,4.7-11.3,4.7-10.8,0-20.8-7.5-20.8-22.5s9.6-24.1,21.7-24.1c6.3,0,11.4,2.6,15.5,5.6l2.3-3.8h5.6v44.3c0,13.2-8.1,21.8-22.5,21.8-6.9,0-15.3-2-19.5-5.4l3.9-10h1.8c2.5,2,6.9,4.1,12.4,4.1,6.5,0,10.9-3.2,10.9-9.5Zm-18.8-23.1c0,7.9,4.1,11.9,9.9,11.9,3.4,0,6.6-1.8,8.9-4.1v-17.3c-2.7-1.9-5.5-3-8.7-3-6.2,0-10.1,4.7-10.1,12.5Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m462.8,44.9c.2,6.2,4.5,10.5,11.6,10.5,4.6,0,10-1.8,13.9-4.5h1.6l4.6,9.3c-4.9,3.2-11.7,5.7-19.5,5.7-15.1,0-25.2-9.2-25.2-24.4,0-16,11-24.9,24-24.9,13.9,0,22,10.1,22,25v3.3h-33Zm-.1-8h21.1c0-5.1-3.9-10.1-10.5-10.1s-10.1,4.9-10.6,10.1Z"/>
            <path class="fill-amber-100 stroke-amber-100" d="m552.7,30.7h-1.8c-3.2-1-6.5-1.7-9.1-1.7-4.5,0-8.3,1.7-12.7,6v29.4h-13V29.2h-10.3v-10.8h15.9l2.7,7c4.4-5,10.2-8.8,17.8-8.8,3,0,7.1.6,10.5,1.8v12.3Z"/>
          </svg>
        </span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a :href="item.href" :class="[item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="team in teams" :key="team.name">
                <a :href="team.href" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ team.initial }}</span>
                  <span class="truncate">{{ team.name }}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-700">
              <img class="h-8 w-8 rounded-full bg-indigo-700" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">J.-M. Keil</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
    <button type="button" class="-m-2.5 p-2.5 text-indigo-200 lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
    <a href="#">
      <span class="sr-only">Your profile</span>
      <img class="h-8 w-8 rounded-full bg-indigo-700" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
    </a>
  </div>
</template>

<style scoped>

</style>