<template>
  <section class="container mx-auto h-full">
    <div v-if="true" class="p-6 flex flex-col h-full">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">
              Élèves
            </h2>

            <span
              class="px-3 py-1 text-xs text-black ring-1 ring-gray-300 bg-gray-200 rounded-full dark:bg-gray-800 dark:text-indigo-400"
              >{{eleves.length}} élèves</span
            >
          </div>

          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Liste intégrale des élèves de votre établissement.
          </p>
        </div>

        <div class="flex items-center mt-4 gap-x-3">
          <button
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          >
            <PrinterIcon class="size-5" />
            <span>Imprimer</span>
          </button>

          <button
            @click.prevent="$emit('changeComponent', 'StudentsAdd', null)"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-gray-850 dark:hover:bg-gray-500 dark:bg-gray-800"
          >
            <PlusCircleIcon class="size-5" />
            <span>Ajouter un élève</span>
          </button>
        </div>
      </div>

      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div
          class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
        >
          <button
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
          >
            Voir tous
          </button>

          <button
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            Garçons
          </button>

          <button
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            Filles
          </button>
        </div>

        <div class="relative flex items-center mt-4 md:mt-0">
          <span class="absolute">
            <MagnifyingGlassIcon
              class="size-5 mx-3 text-gray-400 dark:text-gray-600"
            />
          </span>

          <input
            v-model="searchFilter"
            type="text"
            placeholder="Rechercher un élève"
            class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-indigo-800 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>

      <div class="h-full mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg" >
              <div v-if="loading" class="flex py-80 text-indigo-800 justify-center w-full">
                <div class="loader text-indigo-800"></div>
              </div>

              <table v-if="!loading && filteredEleve.length" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" >
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button
                        class="flex items-center gap-x-3 focus:outline-none"
                      >
                        <span>Noms</span>
                        <FunnelIcon class="size-4" />
                      </button>
                    </th>

                    <th
                      scope="col"
                      class="px-12 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Classe
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Sexe
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Contact
                    </th>

                    <th
                      scope="col"
                      class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Niveau paiement
                    </th>

                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                
                <tbody
                  class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                >
                  <tr v-for="eleve in filteredEleve" :key="eleve.id">
                    <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                      <div>
                        <h2 class="font-medium text-gray-800 dark:text-white">
                          {{ eleve.nom }}
                        </h2>
                      </div>
                    </td>
                    <td
                      class="px-12 py-4 text-sm font-normal whitespace-nowrap"
                    >
                      <div>
                        <h4 class="text-gray-700 dark:text-gray-200">
                          {{ eleve.classe.niveau }} {{ eleve.option }}
                        </h4>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div>
                        <h4 class="text-gray-700 dark:text-gray-200">
                          {{ eleve.sexe }}
                        </h4>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div>
                        <h4 class="text-gray-700 dark:text-gray-200">
                          {{ eleve.contacts[0].telephone }}
                        </h4>
                      </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div
                        class="w-48 h-1.5 bg-gray-200 overflow-hidden rounded-full"
                      >
                        <div class="bg-black w-2/3 h-1.5"></div>
                      </div>
                    </td>

                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <ModalDanger :showDialog="askDeleteStudent" @close="askDeleteStudent = false" @confirmed="deleteStudent(eleve)"></ModalDanger>
                      <Menu>
                        <MenuButton class="hover:bg-indigo-100 p-2 rounded-lg">
                          <EllipsisVerticalIcon class="h-5 w-5 text-indigo-800" aria-hidden="true" />
                        </MenuButton>

                        <transition
                          enter-active-class="transition duration-100 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-in"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0"
                        >
                          <MenuItems class="absolute flex flex-col bg-white p-1 border-1 rounded-2xl shadow-md border-gray-200">
                            <MenuItem v-slot="{ active }">
                              <button
                                @click.prevent="$emit('changeComponent', 'studentsDetail', eleve)"
                                :class="[
                                  active ? 'bg-black text-white' : 'text-gray-900',
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm group',
                                ]"
                              >
                                <DocumentMagnifyingGlassIcon class="mr-2 h-5 w-5 group:hover:text-white" aria-hidden="true" />
                                Voir en détail
                              </button>
                            </MenuItem>
                            
                            <!-- <MenuItem v-slot="{ active }">
                              <button
                                :class="[
                                  active ? 'bg-indigo-800 text-white' : 'text-gray-900',
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                              >
                                <PencilIcon class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true" />
                                Modifier
                              </button>
                            </MenuItem> -->

                            <div class="px-1 py-1">
                              <MenuItem v-slot="{ active }">
                                <button
                                  @click.prevent="askDeleteStudent = true"
                                  :class="[
                                    active ? 'bg-red-700 hover:text-white' : 'text-red-700',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <TrashIcon class="mr-2 h-5 w-5  font-medium" aria-hidden="true" />
                                  Supprimer
                                </button>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Popup section -->

              <ul v-if="popUps.length > 0" class="absolute -end-1 bottom-7 right-7">
                  <li v-for="e in popUps" :key="e.message" class="-end-1 my-2">
                      <ToastSuccess
                          :variant="e.variant" 
                          :message="e.message"
                          v-if="e.value"
                          @closeToast="e.v = false"
                      >
                      </ToastSuccess>
                  </li>
              </ul>

              <div v-if="!loading && !filteredEleve.length" class="flex flex-col py-80 justify-center align-center w-full">
                <p class="text-center flex justify-center"><FaceFrownIcon class="size-10" /></p>
                <p class="text-center font-normal">Aucun élève n'a été trouvé !</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if=false class="mt-6 sm:flex sm:items-center sm:justify-between">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Page
          <span class="font-medium text-gray-700 dark:text-gray-100"
            >1 sur 10</span
          >
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <ArrowLeftIcon class="size-5" />

            <span> Precedent </span>
          </a>
          <a
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span> Suivant </span>
            <ArrowRightIcon class="size-5" />
          </a>
        </div>
      </div>
    </div>
    <div v-else>Vous n'avez pas le droit de voir cette section</div>
  </section>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
import {
  FaceFrownIcon,
  PlusCircleIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  PencilIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon
} from "@heroicons/vue/24/outline";

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ModalDanger from './ModalDanger.vue';
import ToastSuccess from './ToastSuccess.vue'

export default {
  components: {
    FaceFrownIcon,
    PlusCircleIcon,
    CloudArrowUpIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    EllipsisVerticalIcon,
    PrinterIcon,
    PencilIcon,
    TrashIcon,
    DocumentMagnifyingGlassIcon,
    Menu, 
    MenuButton, 
    MenuItems, 
    MenuItem,
    ModalDanger,
    ToastSuccess
  },
  name: "StudentsList",
  data() {
    return {
      loading: false,
      searchFilter: "",
      eleves: [],
      askDeleteStudent: false,
      popUps:[],
    };
  },
  computed: {
    ...mapGetters(['baseURL', 'currentUser']),
    filteredEleve() {
      var temp = [];
      if (this.searchFilter) {
        temp = this.eleves.filter((eleve) => {
          return `${eleve.nom} ${eleve.classe} ${eleve.sexe} ${eleve.contact}`
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase());
        });
      } else temp = this.eleves;

      return temp;
    },
  },
  methods: {
    getStudents() {
        this.loading = true;

        axios.get(`${this.baseURL}/student/${this.currentUser.ecole}`)
        .then(response => {
          this.eleves = response.data;
        })
        .catch(err => {
            this.error = err.message;
        })
        .finally(() => {
            this.loading = false;
        });
    },
    deleteStudent(student) {
      this.askDeleteStudent = false;
      this.loading = true;

      axios.delete(`${this.baseURL}/student/delete/${student._id}`)
      .then(response => {
        this.popUps.push({message: response.data.message, variant: 'success', value: true})
        this.eleves = this.eleves.filter(eleve => {
          return eleve._id != student._id;
        });
      })
      .catch(err => {
        this.error = err.message;
        this.popUps.push({message: err.message, variant: 'error', value: true})
      })
      .finally(() => {
        this.loading = false;
      });
    }
  },
  mounted: function() {
    this.getStudents();
  }
};
</script>


<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 40px;
  aspect-ratio: 1.154;
  --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
  background: 
    var(--_g) 50%  0,
    var(--_g) 0    100%,
    var(--_g) 100% 100%;
  background-size: 35% calc(35%*1.154);
  animation: l16 1s infinite;
}
@keyframes l16{ 
    50%,100% {background-position: 100% 100%,50% 0,0 100%} 
}

</style>