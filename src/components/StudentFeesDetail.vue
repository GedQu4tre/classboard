<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col items- mb-4">

      <small class="font-bold">Filtres</small>

      <div class="flex items-center space-x-4">

      <select v-model="selectedFilter" class="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">

      <option value="all">Tous</option>

      <option value="paid">Payés</option>

      <option value="unpaid">Non payés</option>

      </select>


      <input

      type="text"

      v-model="searchQuery"

      placeholder="Rechercher un frais"

      class="border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"

      >

      </div>

    </div> 

    <div v-if="filteredFees.length > 0 && !loadingFee">
      <div class="flex gap-4 xs-w-full sm:w-[30rem] md:w-[50rem] lg:w-[78rem] me-4 overflow-x-auto snap-x snap-mandatory mt-4 py-2">
        <div 
          v-for="(fee, index) in filteredFees"
          :key="index" 
          class="w-72 h-[25rem] bg-gray-50 flex-shrink-0 p-6 flex flex-col cursor-pointer justify-between ring-1 ring-gray-200 rounded-xl shadow-sm hover:bg-white hover:shadow-xl hover:ring-2" 
          @click.prevent="$emit('selectFee', fee)"
        >
          <div class="flex h-full justify-between gap-3">
            <h3 class="text-xl font-semibold mb-3">
              {{ formatIndex(index + 1) }}.<br> {{ fee.nom }}
            </h3>
            <div class="flex">
              <CheckCircleIcon v-if="fee.paid" class="text-blue-500 size-5" />
              <XCircleIcon v-else class="text-red-500 size-5" />
              <button 
                v-if="fee.paid" 
                class="ml-2 flex h-7 p-1 ring-1 ring-gray-100 bg-gray-50 rounded-md" 
                @click="showRecuModal(fee)"
              >
                <PrinterIcon class="size-4 text-black"/>
              </button>
            </div>
          </div>

          <p class="text-sm">{{ formatDate(fee.date_limite) }}</p>
          <div class="-mt-2">
            <small :class="getRecouvrementClass(fee.date_limite)">
              {{ getRecouvrementText(fee.date_limite) }}
            </small>
          </div>
          <p class="text-gray-600 text-base mt-4">{{ fee.description }}</p>
        </div>


      </div>
    </div>
    <div v-if="!filteredFees.length && !loadingFee">
      <div class="flex flex-col items-center justify-center mt-8 h-[20rem]">
        <FaceFrownIcon class="size-10 text-black" />
        <small class="text-black mt-3">Aucun frais trouvé.</small>
      </div>
    </div>
    <div v-if="loadingFee">
      <div class="flex flex-col items-center justify-center mt-8 h-[20rem]">
        <ArrowPathIcon class="size-10 animate-spin text-black" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
import { CheckCircleIcon, XCircleIcon, FaceFrownIcon, PrinterIcon, ArrowPathIcon } from '@heroicons/vue/24/solid';
import FraisPrint from './FraisPrint.vue'; // Importez le composant RecuModal

export default {
  name: 'StudentFeeDetail',
  components: {FraisPrint, PrinterIcon, CheckCircleIcon, XCircleIcon, FaceFrownIcon, ArrowPathIcon},
  props: ['student'],
  emits: ['selectFee'],
  data() {
    return {
      selectedFilter: 'all',
      searchQuery: '',
      showModal: false,
      selectedFee: null,
      fees: [],
      loadingFee: false,
    };
  },
  computed: {
    ...mapGetters(['baseURL']),
    filteredFees() {
      let filtered = this.fees;

      if (this.selectedFilter !== 'all') {
        filtered = filtered.filter(fee => fee.paid === (this.selectedFilter === 'paid'));
      }

      if (this.searchQuery) {
        filtered = filtered.filter(fee => 
          fee.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return filtered;
    }
  },
  methods: { 
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return `Le ${new Intl.DateTimeFormat('fr-FR', options).format(date)}`;
    },
    formatIndex(index) {
      return index < 10 ? `0${index}` : index;
    },
    async getGrillePaiement() {
      this.loadingFee = true;

      try {
          const response = await axios.get(`${this.baseURL}/frais/grillePaiement/${this.student._id}`);
          this.fees = response.data; // Liste des frais récupérés avec leur statut de paiement

      } catch (error) {
          console.error("Erreur lors de la récupération des frais :", error);
      } finally {
          this.loadingFee = false;
      }
    },
    // Calculer les jours restants ou dépassés
    getRemainingDays(dateLimite) {
      const today = new Date();
      const deadline = new Date(dateLimite);
      const diffTime = deadline - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir en jours
    },
    // Déterminer le texte à afficher pour le délai
    getRecouvrementText(dateLimite) {
      const remainingDays = this.getRemainingDays(dateLimite);
      if (remainingDays < 0) {
        return `Le délai est dépassé de ${Math.abs(remainingDays)} jour(s)`;
      } else if (remainingDays === 0) {
        return "Le recouvrement est aujourd'hui";
      } else {
        return `Il reste ${remainingDays} jour(s) avant le recouvrement`;
      }
    },
    // Déterminer la classe de couleur en fonction du délai
    getRecouvrementClass(dateLimite) {
      const remainingDays = this.getRemainingDays(dateLimite);
      if (remainingDays < 0) {
        return 'text-red-500'; // Délais dépassé
      } else if (remainingDays <= 5) {
        return 'text-orange-500'; // Délais proche
      } else {
        return 'text-blue-500'; // Délais suffisant
      }
    },
  },
  mounted() {
    this.getGrillePaiement();
  }
};
</script>
