<template>
    <div class="container mx-auto p-6 lg:p-10 overflow-hidden h-full">
      <div class="flex gap-4 h-full">
        <!-- Carte Informations personnelles améliorée -->
          <section class="w-full lg:w-1/3 h-full bg-white dark:bg-gray-700 shadow-lg rounded-xl p-6 flex flex-col relative overflow-hidden">
          <!-- Bouton Retour -->
              <button @click="$emit('removeComponent')" title="Retour" class="absolute top-4 left-4 bg-red-100 hover:bg-red-400 text-gray-800 p-2 rounded-full shadow-lg transition duration-200 ease-in-out">
                  <ArrowLeftIcon class="w-5 h-5"/>
              </button>
  
          <!-- Bouton Modifier avec accentuation -->
              <button @click.prevent="$emit('showUpdateStudent')" title="Modifier les informations" class="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105">
                  <PencilIcon class="w-6 h-6"/>
              </button>
  
          <!-- Photo de l'élève ou icône -->
          <div class="mb-4 flex items-center">
              <div class="mr-4">
                  <img v-if="!student.photo" src="../assets/img/ged1.jpg" alt="Photo de l'élève" class="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-indigo-600">
                  <div v-else class="w-24 h-24 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full shadow-lg border-2 border-indigo-600">
                      <UserCircleIcon class="w-12 h-12"/>
                  </div>
              </div>
          <div>
              <!-- Nom de l'élève -->
              <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-1">{{ student.nom }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-300">{{ student.classe.niveau }} {{ student.option }}</p>
          </div>
          </div>
  
          <!-- Informations supplémentaires affichées verticalement -->
          <div class="w-full flex flex-col gap-2">
              <div class="flex flex-col text-left bg-gray-100 dark:bg-gray-600 rounded-lg p-2">
                  <label class="text-xs text-indigo-800 dark:text-indigo-300">Sexe</label>
                  <span class="font-medium text-gray-800 dark:text-white">{{ student.sexe }}</span>
              </div>
  
              <div class="flex flex-col text-left bg-gray-100 dark:bg-gray-600 rounded-lg p-2">
                  <label class="text-xs text-indigo-800 dark:text-indigo-300">Date et lieu de naissance</label>
                  <span class="font-medium text-gray-800 dark:text-white">{{ student.dateNaissance }}</span>
              </div>
  
              <div class="flex flex-col text-left bg-gray-100 dark:bg-gray-600 rounded-lg p-2">
                  <label class="text-xs text-indigo-800 dark:text-indigo-300">Personne à contacter</label>
                      <span class="font-medium text-gray-800 dark:text-white">{{ student.contacts[0].nom }} ({{ student.contacts[0].relation }}) - {{ student.contacts[0].telephone }}</span>
              </div>
          </div>
      </section>
  
          <!-- Section des graphiques et tableau -->
          <section v-if="!currentFrais" class="w-full lg:w-2/3 h-full flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
              <div class="flex gap-4">
                  <!-- Carte Frais -->
                  <div class="w-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                      <h4 class="text-md font-medium text-indigo-600 dark:text-indigo-400 mb-2">Statistiques des frais</h4>
                      <FraisStudentChart :dataChart="chartData" />
                  </div>
  
                  <!-- Carte Points -->
                  <div class="w-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <h4 class="text-md font-medium text-indigo-600 dark:text-indigo-400 mb-2">Statistiques des points</h4>
                  <canvas id="pointsChart" class="h-48"></canvas>
                  </div>
              </div>
  
              <!-- Tableau des frais payés / non payés -->
              <div class="bg-white dark:bg-gray-800 h-full shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <div class="flex justify-between items-center mb-3">
                  <h4 class="text-md font-medium text-indigo-600 dark:text-indigo-400">Frais payés et non payés</h4>
                  <div class="flex gap-2 items-center">
                      <input type="search" class="input-xs p-2 text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-indigo-800" placeholder="Rechercher un frais" />
                      <select class="input-xs p-2 text-xs rounded-md bg-gray-200 dark:bg-gray-700 text-indigo-800">
                      <option value="">Tous</option>
                      <option :value="true">Déjà payé</option>
                      <option :value="false">Pas encore</option>
                      </select>
                  </div>
                  </div>
  
                  <table v-if="!loadingFee && frais.length" class="w-full text-left text-sm">
                      <thead class="bg-indigo-100 dark:bg-gray-600">
                          <tr>
                          <th class="p-2">Nom du frais</th>
                          <th class="p-2">Montant</th>
                          <th class="p-2">Date de paiement</th>
                          <th class="p-2">Statut</th>
                          <th class="p-2">Action</th>
                          </tr>
                      </thead>
                      
                      <tbody>
                          <tr v-for="frais in filteredFrais" :key="frais._id" class="border-t border-gray-200 dark:border-gray-600">
                              <td class="p-2">{{ frais.nom }}</td>
                              <td class="p-2">{{ frais.montant }} FC</td>
                              <td class="p-2">{{ frais.datePaiement || 'Non payé' }}</td>
                              <td class="p-2 flex items-center">
                                  <span title="Déjà payé" v-if="frais.paid" class="text-green-500 flex items-center">
                                      <CheckCircleIcon class="w-5 h-5 mr-1" />
                                  </span>
                                  <span title="Non encore payé" v-else class="text-red-500 flex items-center">
                                      <XCircleIcon class="w-5 h-5 mr-1" />
                                  </span>
                              </td>
                              <td class="gap-1">
                                  <button v-if="!frais.paid" title="Marquer comme payé" @click="toggleStatus(frais, 'add')" class="text-xs bg-gray-200 rounded-md p-2 text-indigo-600">
                                      <CheckIcon class="w-4 h-4" />
                                  </button>
  
                                  <button v-else title="Marquer comme non payé" @click="toggleStatus(frais)" class="ms-1 bg-gray-200 rounded-md p-2 text-indigo-600">
                                      <XMarkIcon class="w-4 h-4 text-red-500" />
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div v-if="!loadingFee && !frais.length" class="flex flex-col text-indigo-800 justify-center align-center py-10">
                      <p class="text-center flex justify-center"><XCircleIcon class="size-7" /></p>
                      <p class="text-center font-normal">Aucun frais n'a été trouvé !</p>
                  </div>
  
                  <div v-if="loadingFee" class="flex text-indigo-800 justify-center py-10">
                      <div class="loader text-indigo-800"></div>
                  </div>
  
              </div>
  
              <!-- Informations sur les points -->
              <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
                  <h4 class="text-md font-medium text-indigo-600 dark:text-indigo-400 mb-3">Informations sur les points</h4>
                  <div class="flex snap-x overflow-x-auto gap-4">
                  <div v-for="point in filteredPoints" :key="point.cours" class="bg-zinc-200 dark:bg-gray-700 rounded-lg shadow-md flex flex-col items-center p-4 w-60 snap-start">
                      <img src="../assets/img/childrens1.jpg" alt="Image du cours" class="h-20 w-full object-cover rounded-t-lg" />
                      <h5 class="text-md font-semibold text-gray-800 dark:text-white mt-2">{{ point.cours }}</h5>
                      <p class="text-sm text-gray-500 dark:text-gray-300">{{ point.nomProf }}</p>
                      <span class="text-xl font-bold text-indigo-600 mt-2">{{ point.obtenu }}</span>
                  </div>
                  </div>
              </div>
          </section>
  
          <!-- Confirmation de paiement -->
          <div v-else class="w-full lg:w-2/3 mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 px-60 flex flex-col justify-center align-center">
              <h2 class="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-center">Confirmation de Paiement</h2>
              
              <!-- Question de confirmation -->
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-6 text-center">
                  Voulez-vous confirmer que <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ student.nom }}</span> a payé le frais 
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{currentFrais.nom }}</span> d'un montant de 
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{currentFrais.montant }} USD</span> ?
              </p>
  
              <!-- Date de paiement modifiable -->
              <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de paiement</label>
                  <input v-model="currentDate" type="date" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              
              <!-- Mot de passe pour confirmation -->
              <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
                  <input type="password" autofocus="on" class="mt-1 p-2 border border-gray-300 rounded-md w-full" placeholder="Entrez votre mot de passe" />
              </div>
  
              <!-- Bouton de confirmation -->
              <button @click="confirmPaiement" class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200">
                  Confirmer le Paiement
              </button>
              
              <!-- Bouton retour -->
              <button @click="currentFrais = null" class="w-full mt-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md transition duration-200">
                  Retour
              </button>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters } from 'vuex'
  import FraisStudentChart from './FraisStudentChart.vue';
  import { PencilIcon, UserIcon, ArrowLeftIcon, CheckIcon, XMarkIcon, UserCircleIcon} from '@heroicons/vue/24/outline'
  import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
  
  export default {
    props: ['student'],
    name: 'StudentsDetail',
    components: { PencilIcon, UserIcon, ArrowLeftIcon, XCircleIcon, CheckCircleIcon, CheckIcon, XMarkIcon, FraisStudentChart, UserCircleIcon },
    data() {
      return {
          frais: [],
          points: [
              { cours: 'Mathématiques', obtenu: '85/100', statut: 'success' },
              { cours: 'Physique', obtenu: '65/100', statut: 'fail' },
              // Ajoute des points ici
          ],
          loadingFee: false,
          loadingPoint: false,
          currentFrais: null,
          chartData: [0, 0],
          newPaiement: {
              student: this.student._id,
              frais: null,
              datePaiement: new Date().toISOString().split('T')[0]
          }
      }
    },
    computed: {
      ...mapGetters(['baseURL']),
      filteredFrais() {
        // Ajoute la logique de filtrage ici
        return this.frais
      },
  
      filteredPoints() {
        // Ajoute la logique de filtrage ici
        return this.points
      },
      currentDate() {
          if (this.currentFrais) {
              return new Date().toISOString().split('T')[0];
          } else return;
      }
    },
    watch: {
      currentFrais: function(nValue, oldValue) {
          console.log(this.currentFrais)
      }
    },
    methods: {
      toggleStatus(frais, kind) {
          this.currentFrais = frais;
          if (kind === 'add') {
              //
          } else {
              //
          }
      },
      async getGrillePaiement() {
          this.loadingFee = true;
  
          try {
              const response = await axios.get(`${this.baseURL}/frais/grillePaiement/${this.student._id}`);
              this.frais = response.data; // Liste des frais récupérés avec leur statut de paiement
  
              // Calcul des pourcentages
              const totalFrais = this.frais.length;
              const totalPaid = this.frais.filter(frais => frais.paid).length;
              const totalUnpaid = totalFrais - totalPaid;
  
              const paidPercentage = (totalPaid / totalFrais) * 100;
              const unpaidPercentage = (totalUnpaid / totalFrais) * 100;
  
              // Mettre à jour les données du graphique
              this.chartData = [paidPercentage, unpaidPercentage];
  
          } catch (error) {
              console.error("Erreur lors de la récupération des frais :", error);
          } finally {
              this.loadingFee = false;
          }
      },
      async confirmPaiement() {
          try {
              const response = await axios.post(`${this.baseURL}/frais/confirmPaiement`, this.newPaiement);
              
              console.log(response)
          } catch (error) {
              console.error("Erreur lors de la récupération des frais :", error);
          } finally {
              this.loadingFee = false;
          }
      }
    },
    mounted: function() {
      this.getGrillePaiement();
    }
  }
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
  