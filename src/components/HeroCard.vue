<template>
  <div class="relative">
    <div
      class="absolute inset-0 blur-xl h-[580px]"
      :style="{
        background: 'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)',
      }"
    ></div>
    
    <div class="relative">
      <header>
        <div
          :class="{'mx-2 pb-5': state, 'hidden': !state}"
          class="md:hidden"
        >
          <div class="flex items-center justify-between py-5 md:block">
            <a href="javascript:void(0)">
              <img
                src="https://www.floatui.com/logo.svg"
                width="120"
                height="50"
                alt="Float UI logo"
              />
            </a>
            <button @click="toggleState" class="menu-btn text-gray-500 hover:text-gray-800">
              <svg v-if="state"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
              </svg>
            </button>
          </div>
        </div>
        <nav
          :class="{'absolute top-0 inset-x-0 bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-0 md:mt-0 md:relative md:bg-transparent': state}"
          class="pb-5 md:text-sm"
        >
          <div class="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <!-- Logo and Menu Toggle Button - Desktop View -->
            <div class="flex items-center justify-between py-5 md:block">
              <a
                  href="javascript:void(0)"
                  class="flex"
                >
                  <GlobeAltIcon class="size-6 my-auto text-indigo-800" />
                  <h4 class="text-2xl font-bold">&nbsp; Classboard</h4>
                  
                </a>
              <button @click="toggleState" class="menu-btn sm:flex md:hidden text-gray-500 hover:text-gray-800">
                <XMarkIcon v-if="state" class="size-6 my-auto text-indigo-800" />
                <Bars3Icon v-else class="size-6 my-auto text-indigo-800" />
              </button>
            </div>
            
            <!-- Navigation Links -->
            <div :class="{'block': state, 'hidden': !state}" class="flex-1 items-center mt-8 md:mt-0 md:flex">
              <ul class="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                <li
                  v-for="item in menuItems"
                  :key="item.title"
                  class="text-gray-700 hover:text-gray-900"
                >
                  <a :href="item.path" class="block">{{ item.title }}</a>
                </li>
              </ul>
              <div class="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                <RouterLink tag="a"
                  to="/login"
                  class="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                >
                  Se connecter
                  <ChevronRightIcon class="size-4" />
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <!-- Section -->
        <section>
          <div class="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
              <div class='flex-none  space-y-5 max-w-xl lg:my-auto'>
                  <a href="javascript:void(0)" class='inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-white'>
                      <span class='inline-block rounded-full px-3 py-1 bg-indigo-800 text-white'>
                          News
                      </span>
                      <p class='flex items-center'>
                          Nous suivre
                          <ChevronRightIcon class="size-5" />
                      </p>
                  </a>
                  <h1 class="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                    Simplifiez la gestion de votre école avec <span class="text-indigo-800">Classboard</span>
                  </h1>
                  <p>
                    Simplifiez la gestion de votre école, libérez-vous pour vous consacrer à l'éducation de vos élèves.
                  </p>
                  <div class='flex items-center gap-x-3 sm:text-sm'>
                      <a href="javascript:void(0)" class="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                          Demarrer
                          <ChevronRightIcon class="size-6" />
                      </a>
                      <a href="javascript:void(0)" class="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex">
                          Nous contacter
                          <ChevronRightIcon class="size-6" />
                      </a>
                  </div>
              </div>
              <div class='flex-1 hidden md:block'>
                  <img src="../assets/img/heroIllustration.png" class="max-w-xl" />
              </div>
          </div>
      </section>
    </div>
  </div>
</template>

<script>
import {GlobeAltIcon, ChevronRightIcon, Bars3Icon, XMarkIcon} from '@heroicons/vue/20/solid'
export default {
  components:  {ChevronRightIcon, GlobeAltIcon, Bars3Icon, XMarkIcon},
  name: 'Dropdown',
  data() {
    return {
      state: false,
      menuItems: [
        { title: 'Fonctionnalités', path: '#features' },
        { title: 'Prix', path: '#price' },
        { title: 'Contacts', path: '#contact' },
        { title: 'Nous', path: '#teams' },
        { title: 'Témoignages', path: '#testimonies' }
      ],
    };
  },
  methods: {
    toggleState() {
      this.state = !this.state;
    }
  },
};
</script>