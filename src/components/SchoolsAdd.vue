<template>
    <div class="main p-7 h-full ms-1 md:w-2/5">
      <section class="flex my-auto w-full">
        <button @click.prevent="$emit('removeComponent')" class="size bg-indigo-50 border border-indigo-100 p-2 rounded-md">
          <ArrowLeftIcon class="size-4" />
        </button>
        <div class="my-auto ms-3">
          <h4 class="font-bold">Ajouter une nouvelle école</h4>
          <p class="text-sm text-gray-400">Formulaire pour ajouter un nouvelle école</p>
        </div>
      </section>
  
      <section class="mt-7 w-full mx-auto">
        <form @submit.prevent="submitEcole" class="form flex flex-col bg-white space-y-4 border-2 border-gray-100 rounded-lg p-4 h-full">
          <!-- Infos École -->
          <div class="mb-4">
            <label for="nom" class="block text-sm font-medium text-gray-700">Nom de l'école</label>
            <input id="nom" v-model="ecole.nom" type="text" required class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100" />
          </div>
          <div class="mb-4">
            <label for="adresse" class="block text-sm font-medium text-gray-700">Adresse</label>
            <input id="adresse" v-model="ecole.adresse" type="text" class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100" />
          </div>
          <div class="mb-4">
            <label for="abonnement" class="block text-sm font-medium text-gray-700">Type d'Abonnement</label>
            <select id="abonnement" v-model="ecole.abonnement.type" class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100">
              <option value="gratuit">Gratuit</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div class="mb-4" v-if="ecole.abonnement.type !== 'gratuit'">
            <label for="dateExpiration" class="block text-sm font-medium text-gray-700">Date d'Expiration</label>
            <input id="dateExpiration" v-model="ecole.abonnement.dateExpiration" type="date" class="mt-1 p-2 block w-full border rounded-md shadow-sm" />
          </div>

          <div class="mt-7"></div>
  
          <!-- Infos Administrateur -->
          <h5 class="font-bold text-gray-700">Informations de l'administrateur</h5>
          <div class="mb-4">
            <label for="adminNom" class="block text-sm font-medium text-gray-700">Nom</label>
            <input id="adminNom" v-model="admin.nom" type="text" required class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100" />
          </div>

          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input id="username" v-model="admin.username" type="text" required class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input id="password" v-model="admin.password" type="password" required class="mt-1 p-2 block w-full border rounded-md shadow-sm bg-gray-100" />
          </div>
  
          <div class="flex flex-col relative p-3">
            <button :disabled="loading" class="mt-4 bg-black p-2 rounded-md text-white hover:bg-gray-800 disabled:bg-gray-500 flex items-center justify-center space-x-2 w-full">
              <ArrowPathIcon class="size-6 text-white animate-spin" v-if="loading" />
              <ArrowDownOnSquareIcon class="size-5" />
              <span v-if="!loading">Enregistrer</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import {mapGetters} from 'vuex'
  import { ArrowLeftIcon, ArrowDownOnSquareIcon, ArrowPathIcon } from '@heroicons/vue/20/solid';
  export default {
    components: { ArrowLeftIcon, ArrowDownOnSquareIcon, ArrowPathIcon },
    data() {
      return {
        ecole: {
          nom: '',
          adresse: '',
          abonnement: { type: 'gratuit', dateExpiration: '' },
        },
        admin: {
          nom: '',
          username: 'admin',
          password: 'admin',
        },
        loading: false,
      };
    },
    computed: {
      ...mapGetters(['baseURL']),
    },
    methods: {
      submitEcole() {
        this.loading = true;
        axios
          .post(`${this.baseURL}/school/create`, { 
            nom: this.ecole.nom, 
            adresse: this.ecole.adresse, 
            abonnement: this.ecole.abonnement, 
            administrateur: this.admin  })
          .then(response => {
            this.resetForm();
          })
          .catch(err => {
            console.log(err.response)
            // console.error(err)
          })
          .finally(() => {
            this.loading = false;
          });
      },
      resetForm() {
        this.ecole = { nom: '', adresse: '', abonnement: { type: 'gratuit', dateExpiration: '' } };
        this.admin = { nom: '', username: '', password: '' };
      },
    },
  };
  </script>
  