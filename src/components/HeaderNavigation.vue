<template>
    <header>
        <Popover class="relative bg-white">
          <div class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
              </a>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
              <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="sr-only">Open menu</span>
                <InboxArrowDownIcon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
            <PopoverGroup as="nav" class="hidden md:flex space-x-10">
              <Popover class="relative" >
                <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                  <span>Solutions</span>
                  <InboxArrowDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
                </PopoverButton>
  
                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                  <PopoverPanel class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                        <a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                          <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white sm:h-12 sm:w-12">
                            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">
                              {{ item.name }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                              {{ item.description }}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
  
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-base font-medium text-gray-500 hover:text-gray-900">
                {{ item.name }}
              </a>
            </PopoverGroup>
            <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="#" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Sign in </a>
              <a href="#" class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign up </a>
            </div>
          </div>
  
          <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <PopoverPanel focus class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div class="pt-5 pb-6 px-5">
                  <div class="flex items-center justify-between">
                    <div>
                      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                    </div>
                    <div class="-mr-2">
                      <PopoverButton class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span class="sr-only">Close menu</span>
                        <InboxArrowDownIcon class="h-6 w-6" aria-hidden="true" />
                      </PopoverButton>
                    </div>
                  </div>
                  <div class="mt-6">
                    <nav class="grid grid-cols-1 gap-7">
                      <a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                        <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div class="ml-4 text-base font-medium text-gray-900">
                          {{ item.name }}
                        </div>
                      </a>
                    </nav>
                  </div>
                </div>
                <div class="py-6 px-5">
                  <div class="grid grid-cols-2 gap-4">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-base font-medium text-gray-900 hover:text-gray-700">
                      {{ item.name }}
                    </a>
                  </div>
                  <div class="mt-6">
                    <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"> Sign up </a>
                    <p class="mt-6 text-center text-base font-medium text-gray-500">
                      Existing customer?
                      <a href="#" class="text-gray-900"> Sign in </a>
                    </p>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
    </header>
</template>

<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
// import { ChatBubbleBottomCenterTextIcon,  ChatBubbleLeftEllipsisIcon, InboxArrowDownIcon, Bars3Icon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/vue/20/outline'
import { InboxArrowDownIcon } from '@heroicons/vue/20/solid'

export default {
    components: {  InboxArrowDownIcon },
    name: 'HeaderNavigation',
    data() {
        return {
            solutions: [
            {
                name: 'Inbox',
                description: 'Get a better understanding of where your traffic is coming from.',
                href: '#',
                icon: InboxArrowDownIcon,
            },
            {
                name: 'Messaging',
                description: 'Speak directly to your customers in a more meaningful way.',
                href: '#',
                icon: InboxArrowDownIcon,
            },
            { 
                name: 'Live Chat', 
                description: "Your customers' data will be safe and secure.", 
                href: '#', 
                icon: InboxArrowDownIcon },
            {
                name: 'Knowledge Base',
                description: "Connect with third-party tools that you're already using.",
                href: '#',
                icon: InboxArrowDownIcon,
            },
            ],
            navigation: [
                { name: 'Pricing', href: '#' },
                { name: 'Partners', href: '#' },
                { name: 'Company', href: '#' },
            ]
        }
    }
}
</script>