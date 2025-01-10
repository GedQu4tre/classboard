<template>
    <section class="container mx-auto h-full">
      <div v-if="true" class="p-6 flex flex-col h-full">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-x-3">
              <h2 class="text-lg font-medium text-gray-800 dark:text-white">
                Listes des écoles abonnées
              </h2>
  
              <span
                class="px-3 py-1 text-xs text-black bg-gray-200 rounded-full dark:bg-gray-800 dark:text-indigo-400"
                >{{ecoles.length}} école{{ ecoles.length  > 1 ? 's':'' }}</span
              >
            </div>
  
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Liste des écoles ayant un abonnement chez Classboard
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
              @click.prevent="$emit('changeComponent', 'SchoolsAdd', null)"
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-black rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-gray-800 dark:hover:bg-blue-500 dark:bg-blue-600"
            >
              <PlusCircleIcon class="size-5" />
              <span>Ajouter une école</span>
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
              Payés
            </button>
  
            <button
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              Impayés
            </button>
          </div>
  
          <div class="relative flex items-center mt-4 md:mt-0">
            <span class="absolute">
              <MagnifyingGlassIcon
                class="size-5 mx-3 text-gray-400 dark:text-gray-600"
              />
            </span>
  
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Rechercher un ecoles"
              class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-indigo-800 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />

            <select 
              v-model="filterType"
              class="block w-full ms-1 py-2 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-indigo-800 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="all">Tous</option>
              <option value="premium">Premium</option>
              <option value="gratuit">Gratuit</option>
            </select>
          </div>
        </div>
  
        <div class="h-full mt-6">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <div v-if="loading" class="flex py-80 text-indigo-800 justify-center w-full">
                  <div class="loader text-indigo-800"></div>
                </div>
  
                <table v-if="!loading && filteredEcole.length" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" class="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              <button class="flex items-center gap-x-3 focus:outline-none">
                              <span>Nom de l'école</span>
                              </button>
                          </th>
                          <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Adresse
                          </th>
                          <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Administrateur
                          </th>
                          <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Type d'abonnement
                          </th>
                          <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400">
                              Date d'expiration
                          </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      <tr v-for="ecole in filteredEcole" :key="ecole._id">
                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 class="font-medium text-gray-800 dark:text-white">{{ ecole.nom }}</h2>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">{{ ecole.adresse }}</h4>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">{{ ecole.administrateur.nom }}</h4>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 class="text-gray-700 dark:text-gray-200">{{ ecole.abonnement.type }}</h4>
                          </div>
                        </td>
                        <td class="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 :class="calculateDaysRemaining(ecole.abonnement.dateExpiration).style">
                              {{ calculateDaysRemaining(ecole.abonnement.dateExpiration).text }}
                            </h4>
                          </div>
                        </td>
                      </tr>
                    </tbody>

                </table>


  
                <div v-if="!loading && !filteredEcole.length" class="flex flex-col py-80 justify-center align-center w-full">
                <p class="text-center flex justify-center"><FaceFrownIcon class="size-10" /></p>
                <p class="text-center font-normal">Aucune école n'a été trouvée !</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
<script>
import axios from 'axios';
import {mapGetters } from 'vuex';

import {
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
  FaceFrownIcon
} from "@heroicons/vue/24/outline";

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import ModalDanger from './ModalDanger.vue';
import ToastSuccess from './ToastSuccess.vue'

export default {
    name: 'ecolesList',
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
    data() {
        return {
          searchTerm: "", // Terme de recherche pour le filtre
          filterType: "all", 
          loading: false,
          askDeleteFee: false,
          ecoles: [],
        }
    },
    computed: {
      ...mapGetters(['baseURL']),
      filteredEcole: function() {
        if (this.ecoles.length) {
          return this.ecoles.filter((ecole) => {
          // Filtrer par nom d'école
          const matchesNom = ecole.nom
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());

          // Filtrer par nom d'administrateur
          const matchesAdministrateur =
            ecole.administrateur?.nom
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) || false;

          // Filtrer par type d'abonnement
          const matchesAbonnement =
            this.filterType === "all" ||
            ecole.abonnement.type.toLowerCase() === this.filterType.toLowerCase();

              return (matchesNom || matchesAdministrateur) && matchesAbonnement;
          });
        } else return []
      },
    },
    methods: {
      getEcoles: function() {
        this.loading = true;

        axios.get(`${this.baseURL}/school/`)
        .then(response => {
          console.log(response.data)
          this.ecoles = response.data.ecoles;
    
        })
        .catch(err => {
            this.error = err.message;
            console.log(err)
        })
        .finally(() => {
            this.loading = false;
        });
      },
      calculateDaysRemaining(dateExpiration) {
        const today = new Date();
        const expirationDate = new Date(dateExpiration);
        const diffTime = expirationDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          return { text: `Expire dans ${diffDays} jour(s)`, style: diffDays < 5 ? 'text-red-500' : diffDays < 10 ? 'text-yellow-500' : 'text-gray-700' };
        } else {
          return { text: `Expiré il y a ${Math.abs(diffDays)} jour(s)`, style: 'text-red-500' };
        }
      },
    },
    beforeMount: function() {
      this.getEcoles();
    }
}
</script>
  