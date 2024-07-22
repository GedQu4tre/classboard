<template>
    <div class="bg-indigo-500">
        <nav class="fixed top-0 left-0 w-auto h-full border-r bg-white space-y-8">
          <div class="flex absolute justify-end w-full">
            <button @click.prevent="showNameSideBar.state = !showNameSideBar.state" class="btn-sm bg-white rounded-md shadow flex justify-center  size-8 -me-3">
              <component class="size-3 my-auto" :is="showNameSideBar.icon"></component>
            </button>
          </div>
          <div class="flex flex-col h-full">
            <div class="h-20 flex items-center justify-center px-8 divide-y-8 divide-slate-600">
              <a href="javascript:void(0)" class="flex-none">
                <GlobeAltIcon class="size-7 text-indigo-800"></GlobeAltIcon>
              </a>
            </div>
            <div class="flex-1 flex flex-col h-full">
              <ul class="px-4 text-sm font-medium flex-1 flex flex-col gap-5">
                  <li v-for="item in navigation" @click.prevent="menuClicked(item)" :key="item" class="ms-3 text-red-400">
                    <a
                      :href="item.href" :class="item.active ? 'font-bold text-indigo-800': 'text-gray-600'"
                      class="relative flex items-center justify-between gap-x-2 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150 group"
                    >
                      <div class="flex items-center gap-x-2">
                        <component :is="item.icon" class="size-5"></component>
                        <TransitionRoot 
                          :show="showNameSideBar.state"
                          enter="transition-opacity duration-75"
                          enter-from="opacity-0"
                          enter-to="opacity-100"
                          leave="transition-opacity duration-150"
                          leave-from="opacity-100"
                          leave-to="opacity-0"
                        >
                          <span class="group-hover:text-gray-800">{{ item.name }}</span>
                        </TransitionRoot>
                      </div>
                      <span v-if="!showNameSideBar.state" class="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                        {{ item.name }}
                      </span>
                    </a>
                  </li>
                </ul>

              <div class="mb-6 pb-4">
                <ul class="px-4 pb-4 text-sm font-medium">
                    <li v-for="item in navsFooter" :key="item.name" class="flex ms-3">
                      <a
                        :href="item.href"
                        class="relative flex items-center justify-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 group"
                      >
                        <div class="flex items-center gap-x-2">
                          <component :is="item.icon" class="text-gray-500 size-5"></component>
                          <span v-if="showNameSideBar.state" class="text-gray-600 group-hover:text-gray-800">{{ item.name }}</span>
                        </div>
                        <span v-if="!showNameSideBar.state" class="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150">
                          {{ item.name }}
                        </span>
                      </a>
                    </li>
                </ul>

                <div>

                </div>
              </div>
            </div>
          </div>
      </nav>
    </div>
</template>

<script>
import { HomeIcon, UsersIcon, UserIcon, BriefcaseIcon, ChartBarIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon, CalendarIcon, BanknotesIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { GlobeAltIcon } from '@heroicons/vue/20/solid';
import {TransitionRoot} from '@headlessui/vue'
export default {
    components: {TransitionRoot, GlobeAltIcon, HomeIcon, UsersIcon,UserIcon, BriefcaseIcon, ChartBarIcon, Cog6ToothIcon, ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon, CalendarIcon, BanknotesIcon, ArrowRightIcon, ArrowLeftIcon},
    name: 'SideBar',
    data() {
        return {
            navigation: [
                {
                    href: "javascript:void(0)",
                    name: "Accueil",
                    icon: HomeIcon,
                    active: true
                },
                {
                    href: "javascript:void(0)",
                    name: "Élèves",
                    icon: UsersIcon,
                    active: false
                },
                {
                    href: "javascript:void(0)",
                    name: "Frais",
                    icon: BanknotesIcon,
                },
                {
                    href: "javascript:void(0)",
                    name: "Employés",
                    icon: UserIcon,
                    active: false
                },
                {
                    href: "javascript:void(0)",
                    name: "Évaluations",
                    icon: ChartBarIcon,
                    active: false
                },
                {
                    href: "javascript:void(0)",
                    name: "Horaires",
                    icon: CalendarIcon,
                    active: false
                },
            ],
            navsFooter: [
                {
                    href: "javascript:void(0)",
                    name: "Aide",
                    icon: QuestionMarkCircleIcon,
                },
                {
                    href: "javascript:void(0)",
                    name: "Paramètres",
                    icon: Cog6ToothIcon,
                },
                {
                    href: "javascript:void(0)",
                    name: "Déconnexion",
                    icon: ArrowLeftStartOnRectangleIcon,
                },
            ],
            showNameSideBar: {
              state: false,
              icon: ArrowRightIcon
            }
        }
    },
    watch: {
      "showNameSideBar.state": function() {
        if (this.showNameSideBar.state) this.showNameSideBar.icon = "ArrowLeftIcon"
        else this.showNameSideBar.icon = "ArrowRightIcon"
      }
    },
    methods: {
      menuClicked(menu) {
        console.log(menu)
      }
    }
}
</script>

