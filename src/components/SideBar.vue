<template>
  <div class="col bg-indigo-500">
    <nav class="relative top-0 left-0 w-auto h-full border-r bg-white">
      <div class="flex absolute justify-end w-full">
        <button
          @click.prevent="showNameSideBar.state = !showNameSideBar.state"
          class="btn-sm bg-white rounded-md shadow flex justify-center size-8 -me-3"
        >
          <component
            class="size-3 my-auto"
            :is="showNameSideBar.icon"
          ></component>
        </button>
      </div>
      <div class="flex flex-col h-full">
        <div
          class="h-20 flex items-center justify-center px-8 divide-y-8 divide-slate-600"
        >
          <a href="javascript:void(0)" class="flex-none">
            <GlobeAltIcon class="size-7 text-black"></GlobeAltIcon>
          </a>
        </div>
        <div class="flex-1 flex flex-col h-full">
          <ul class="px-4 text-sm font-medium flex-1 flex flex-col gap-5">
            <li
              v-for="item in navigation"
              @click.prevent="menuClicked(item)"
              :key="item"
              class="ms-3 flex text-center"
            >
              <a
                :href="item.href"
                class="relative flex items-center justify-between gap-x-2 p-2 rounded-lg duration-150 group"
                :class="
                  item.active
                    ? 'font-bold text-black '
                    : 'text-gray-500' "
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
                    <span class="group-hover:text-black">{{
                      item.name
                    }}</span>
                  </TransitionRoot>
                </div>
                <span
                  v-if="!showNameSideBar.state"
                  class="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150"
                >
                  {{ item.name }}
                </span>
              </a>
            </li>
          </ul>

          <div class="mb-6 pb-4">
            <ul class="px-4 pb-4 text-sm font-medium">
              <li v-for="item in navsFooter" @click.prevent="footerButtonClicked(item.name)" :key="item.name" class="flex ms-3 cursor-pointer">
                <p
                  class="relative flex items-center justify-center gap-x-2 p-2 rounded-lg hover:bg-gray-200 active:bg-gray-100 duration-150 group"
                  :class="item.name == 'Déconnexion' ? 'text-red-500': 'text-gray-600'"
                >
                  <div class="flex items-center gap-x-2">
                    <component
                      :is="item.icon"
                      class="size-5"
                    ></component>
                    <span
                      v-if="showNameSideBar.state"
                      class=""
                    >{{ item.name }}</span>
                  </div>
                  <span
                    v-if="!showNameSideBar.state"
                    class="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150"
                  >
                    {{ item.name }}
                  </span>
                </p>
              </li>

              <li class="flex ms-3 cursor-pointer mt-10">
                <p class="relative flex items-center justify-center gap-x-2 p-2 rounded-lg hover:bg-gray-200 active:bg-gray-100 duration-150 group">
                  <div class="flex justify-center items-center gap-x-2">

                    <div class="bg-black ring-1 ring-offset-1 ring-black text-white flex text-xl font-light size-10 rounded-full items-center justify-center">
                      <h4>{{ currentUser.nom.slice(0, 1) }}{{ currentUser.nom.split(' ')[1].slice(0, 1) }}</h4>
                    </div>

                    <span
                      v-if="showNameSideBar.state"
                      class="flex flex-col"
                    >
                      {{ currentUser.nom }}
                      <small class="text-gray-600 -mt-1">@{{currentUser.username}}</small>
                    </span>
                  </div>
                  <span
                    v-if="!showNameSideBar.state"
                    class="absolute left-14 p-1 px-1.5 rounded-md whitespace-nowrap text-xs text-white bg-gray-800 hidden group-hover:inline-block group-focus:hidden duration-150"
                  >
                    Vous ếtes connecté sous le nom de {{ currentUser.nom}}
                  </span>
                </p>
              </li>
            </ul>

            <div></div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {
  HomeIcon,
  UsersIcon,
  UserIcon,
  BriefcaseIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  BanknotesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BuildingLibraryIcon,
  
} from "@heroicons/vue/24/outline";
import {UserCircleIcon} from "@heroicons/vue/24/solid"
import {mapGetters } from 'vuex';
import { GlobeAltIcon } from "@heroicons/vue/20/solid";
import { TransitionRoot } from "@headlessui/vue";
export default {
  components: {
    TransitionRoot,
    GlobeAltIcon,
    HomeIcon,
    UsersIcon,
    UserIcon,
    BriefcaseIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftStartOnRectangleIcon,
    QuestionMarkCircleIcon,
    CalendarIcon,
    BanknotesIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    BuildingLibraryIcon,
    UserCircleIcon
  },
  name: "SideBar",
  data() {
    return {
      navigation: [
        {
          href: "HomeAdmin",
          name: "Accueil",
          icon: HomeIcon,
          active: true,
        },
        {
          href: "StudentsAdmin",
          name: "Élèves",
          icon: UsersIcon,
          active: false,
        },
        {
          href: "FraisAdmin",
          name: "Frais",
          icon: BanknotesIcon,
          active: false,
        },
        {
          href: "OnlyPremium",
          name: "Employés",
          icon: UserIcon,
          active: false,
        },
        {
          href: "OnlyPremium",
          name: "Évaluations",
          icon: ChartBarIcon,
          active: false,
        },
        {
          href: "OnlyPremium",
          name: "Horaires",
          icon: CalendarIcon,
          active: false,
        },
        {
          href: "SchoolsAdmin",
          name: "Ecoles",
          icon: BuildingLibraryIcon,
          active: false,
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
        icon: ArrowRightIcon,
      },
    };
  },
  watch: {
    "showNameSideBar.state": function () {
      if (this.showNameSideBar.state)
        this.showNameSideBar.icon = "ArrowLeftIcon";
      else this.showNameSideBar.icon = "ArrowRightIcon";
    },
  },
  computed: {
    ...mapGetters(['currentUser']),
  },
  methods: {
    menuClicked(menu) {
      this.$store.state.currentView = menu.href;
      this.navigation.filter((nav) => {
        nav == menu ? (nav.active = true) : (nav.active = false);
      });
    },
    async footerButtonClicked(name) {
      if (name == 'Déconnexion') {
        try {
          await this.$store.dispatch('logout');
          this.$router.push('/login'); // Redirige vers la page du login

        } catch (err) {
          console.log(err)
        }
      } else {
        //
      }

    },
  },
};
</script>
