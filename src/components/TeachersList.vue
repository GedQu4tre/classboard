<template>
    <section class="container mx-auto h-full">
      <div v-if="true" class="p-6 flex flex-col h-full">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-x-3">
              <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                Enseignants
              </h2>
  
              <span
                class="px-3 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full dark:bg-gray-800 dark:text-indigo-400"
                >{{enseignants.length}} enseignants</span
              >
            </div>
  
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Liste intégrale des enseignants de votre établissement.
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
              @click.prevent="$emit('changeComponent', 'TeachersAdd', null)"
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-indigo-800 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-indigo-600 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <PlusCircleIcon class="size-5" />
              <span>Ajouter un enseignant</span>
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
              Hommes
            </button>
  
            <button
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              Femmes
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
              placeholder="Rechercher un enseignant"
              class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-indigo-800 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
  
        <div class="h-full mt-6">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
            >
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <div v-if="loading" class="flex py-80 text-indigo-800 justify-center w-full">
                  <div class="loader text-indigo-800"></div>
                </div>
  
                <table v-if="!loading && filteredEnseignant.length" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                        Spécialité
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
                        Salaire
                      </th>
  
                      <th scope="col" class="relative py-3.5 px-4">
                        <span class="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody
                    class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                  >
                    <tr v-for="enseignant in filteredEnseignant" :key="enseignant.id">
                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 class="font-medium text-gray-800 dark:text-white">
                            {{ enseignant.nom }}
                          </h2>
                        </div>
                      </td>
                      <td
                        class="px-12 py-4 text-sm font-normal whitespace-nowrap"
                      >
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {{ enseignant.specialite }}
                          </h4>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {{ enseignant.sexe }}
                          </h4>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {{ enseignant.contact }}
                          </h4>
                        </div>
                      </td>
  
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 class="text-gray-700 dark:text-gray-200">
                            {{ enseignant.salaire }} €
                          </h4>
                        </div>
                      </td>
  
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <ModalDanger :showDialog="askDeleteTeacher" @close="askDeleteTeacher = false" @confirmed="deleteTeacher(enseignant)"></ModalDanger>
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
                            <MenuItems v-if=false class="absolute flex flex-col bg-white p-1 border-1 rounded-2xl shadow-md border-gray-200">
                              <MenuItem v-slot="{ active }">
                                <button
                                  @click.prevent="$emit('changeComponent', 'teacherDetail', enseignant)"
                                  :class="[
                                    active ? 'bg-indigo-800 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <DocumentMagnifyingGlassIcon class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                                  Voir en détail
                                </button>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <button
                                  @click.prevent="$emit('changeComponent', 'TeacherEdit', enseignant)"
                                  :class="[
                                    active ? 'bg-indigo-800 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <PencilSquareIcon class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                                  Modifier
                                </button>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <button
                                  @click="askDeleteTeacher = true"
                                  :class="[
                                    active ? 'bg-indigo-800 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  ]"
                                >
                                  <TrashIcon class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                                  Supprimer
                                </button>
                              </MenuItem>
                            </MenuItems>
                          </transition>
                        </Menu>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="!loading && !filteredEnseignant.length" class="flex py-80 text-indigo-800 justify-center w-full">
                  <p class="text-gray-500 dark:text-gray-300">Aucun enseignant trouvé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

<script>
import {
  PlusCircleIcon,
  PrinterIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentMagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EllipsisVerticalIcon
} from '@heroicons/vue/24/outline';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import ModalDanger from './ModalDanger.vue'; // Importation du modal de confirmation de suppression

export default {
    name: 'TeachersAdmin',
    component: {ModalDanger, },
    data() {
        return {
            enseignants: [
                { id: 1, nom: 'Jean Dupont', specialite: 'Mathématiques', sexe: 'Homme', contact: 'jean.dupont@example.com', salaire: 3000 },
                { id: 2, nom: 'Marie Curie', specialite: 'Physique', sexe: 'Femme', contact: 'marie.curie@example.com', salaire: 3200 },
            ],
            searchFilter: '',
            askDeleteTeacher: false,
            loading: false,
        }
    },
    computed: {
        filteredEnseignant() {
            if (!this.searchFilter) {
                return this.enseignants;
            }
            return this.enseignants.filter(enseignant =>
                enseignant.nom.toLowerCase().includes(this.searchFilter.toLowerCase())
            )
        }
    },
    methods: {
        deleteTeacher(enseignant) {
            this.askDeleteTeacher = false;
            // Utiliser `this.enseignants` pour référencer la propriété de l'instance
            this.enseignants = this.enseignants.filter(e => e.id !== enseignant.id);
            // Logique additionnelle de suppression (par exemple, appel API)
        }
    }

}
</script>

  