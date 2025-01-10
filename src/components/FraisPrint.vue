<template>
    <span id="zonePrint" class="flex w-full print:w-full">
      <div v-if="currentFrais.paid" class="rightSide p-14 print:p-2 ring ring-gray-200 bg-gray-100 print:ring-0 rounded-xl flex flex-col items-around">
        <div class="flex justify-end mb-4 fixed right-5 top-20">
          <button @click.prevent="$emit('cancelPrinter')" class="p-2 print:hidden rounded-full ring bg-white">
            <XMarkIcon class="size-4"/>
          </button>
        </div>
        <div class="flex flex-col h-full">
          <div class="w-full items-center flex justify-between">
            <img src="../assets/img/vortexIcon.png" width="40" class=""  alt="Vortex">
            <small>Ticket N° 
              <span class="font-mono font-bold text-xl">01254 </span>
              <button v-print="'#zonePrint'" class="p-2 print:hidden rounded-md text-black bg-white shadow print:shadow-none">
                <PrinterIcon class="size-4" />
              </button>
            </small>
          </div>
          
          

          <div class="mt-12 print:mt-4 flex flex-col">
            <small>{{currentFrais.ecole}}</small>
            <div class="flex text-xl print:text-lg font-medium" style="font-family: 'sf ui display'">
              {{ student.nom }}
              <CheckCircleIcon class="flex size-5 mt-1 ms-2 text-blue-500"/>
            </div>
          </div>

          <div class="infos mt-5 flex flex-col gap-y-2 border-s-4 ps-5">
            <p>
              <small class="text-blue-500">Intitluté du frais: <br></small>
              <span>{{currentFrais.nom}}</span>
            </p>

            <p>
              <small class="text-blue-500">Enregistré par<br></small>
              <span>{{currentFrais.personnel}}</span>
            </p>
            <p>
              <small class="text-blue-500">Date paiement: <br></small>
              <span>{{dateFormatage(currentFrais.datePaiement)}}</span>
            </p>
          </div>

          <div class="mt-auto print:mt-10 mb-20 print:mb-4 text-xs font-medium align-self-end signature ring-1 ring-gray-300 bg-gray-200 p-3 rounded-lg pb-20 text-center">
            Signature et sceau
          </div>
        </div>

        <div class="flex print:items-center print:-mb-28">
          <img :src="qrcode" alt="qrcode" class="size-40 print:size-32 rounded-lg">
          <div class="flex flex-col h-full justify-around pb-2">
            <p class="font-bold"><small class="font-light text-xs">Date livraison <br></small>{{formattedDate}}</p>
            <p class="text-xs">Toute <span class="text-blue-500 font-medium">falsification</span> de ce document est passible des <span class="text-blue-500 font-medium">poursuite judiciaire.</span></p>
          </div>
        </div>
      </div>

      <div v-else class="rightSide p-14 w-full ring ring-gray-200 bg-gray-100 print:ring-0 rounded-xl flex flex-col items-around">
        <div class="flex justify-end mb-4 fixed right-5 top-20">
          <button @click.prevent="$emit('cancelPrinter')" class="p-2 rounded-full ring bg-white">
            <XMarkIcon class="size-4"/>
          </button>
        </div>
      <div class="flex flex-col h-full">
        <div class="w-full items-center flex justify-between">
          <img src="../assets/img/vortexIcon.png" width="40" class=""  alt="Vortex">
        </div>

        <div class="mt-12 flex flex-col">
          <small>{{currentFrais.ecole}}</small>
          <div class="flex text-xl font-medium" style="font-family: 'sf ui display'">
            {{ student.nom }}
            <CheckCircleIcon class="flex size-5 mt-1 ms-2 text-blue-500"/>
          </div>
        </div>

        <div class="infos mt-5 flex flex-col gap-y-2 border-s-4 ps-5">
          <p>
            <small class="text-blue-500">Intitluté du frais: <br></small>
            <span>{{currentFrais.nom}}</span>
          </p>

          <p>
            <small class="text-blue-500">Délivré par<br></small>
            <span>{{currentUser.nom}}</span>
          </p>

          <p>
            <label class="text-blue-500 text-xs">Date paiement: <br></label>
            <input v-model="newPaiement.datePaiement" type="date" name="datePaiement" id="datePaiement" class="p-3 ring-1 rounded-md w-full">
          </p>

          <div class="mt-4">
            <label class="text-blue-500 font-bold text-xs">Mot de passe*: <br></label>
            <input v-model="userPassword" type="password" name="mdp" id="mdp" class="p-3 ring-1 rounded-md w-full">
            <p v-if="!wrongPassword.value" class="text-gray-500 text-xs text-center mt-2 w-100">Votre mot de passe pour confirmer le paiement</p>

            <p v-else class="text-red-500 text-xs mt-2 text-center font-medium">{{wrongPassword.message}}</p>
          </div>

          <p v-if="userPassword && newPaiement.datePaiement" class="mt-4">
            <button @click.prevent="saveChangeOnPaiement(currentFrais)" v-if="!saving" class="bg-black flex flex-col text-center text-white p-3 py-5 w-full justify-center rounded-md">
              <span class="text-xs font-semibold">Marqué comme payé</span>
            </button>

            <button v-else class="bg-black flex flex-col text-center text-white p-3 w-full justify-center rounded-md">
              <ArrowPathIcon class="size-6 w-auto text-white animate-spin" />
            </button>
          </p>
        </div>
      </div>
      </div>
    </span>
  </template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'
import {useQRCode} from '@vueuse/integrations/useQRCode';
import print from 'vue3-print-nb';
import {PrinterIcon, CheckCircleIcon, XMarkIcon, ArrowPathIcon} from '@heroicons/vue/24/solid'
export default {
  components: {PrinterIcon, CheckCircleIcon, XMarkIcon, ArrowPathIcon},
  props: ['currentFrais', 'student'],
  directives: {print},
  data() {
    return {
      qrcode: useQRCode(this.currentFrais.paiementId),
      today: new Date(),
      saving: false,
      userPassword: '',
      wrongPassword: {
        value: false,
        message: ''
      },
      newPaiement: {
        student: this.student._id,
        frais: null,
        datePaiement: new Date().toISOString().split('T')[0],
        user: null
      }
    }
  },
  watch: {
    'userPassword': function() {
      this.wrongPassword.value = false;
    }
  },
  computed: {
    ...mapGetters(['baseURL', 'currentUser']),
    currentBanner() {
      if (currentFee) {
        return 'FraisPrint'
      } else {
        return ''
      }
    },
    formattedDate() {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formatted = this.today.toLocaleDateString('fr-FR', options);
      return `Le ${formatted.replace('.', '')}`;
    },
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`; // Format ISO pour <input type="date">
    },
    async saveChangeOnPaiement(fee) {
      this.saving = true;
      this.newPaiement.frais = fee._id;
      this.newPaiement.user = this.currentUser.id;
      this.newPaiement.userPassword = this.userPassword;

      try {
          const response = await axios.post(`${this.baseURL}/frais/confirmPaiement`, this.newPaiement);
          this.$emit('feesUpdated', response.data)
      } catch (error) {
          this.wrongPassword.value = true;
          this.wrongPassword.message = error.response.data.message;
      } finally {
          this.saving = false;
      }
    },
    dateFormatage: function(d) {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formatted = new Date(d).toLocaleDateString('fr-FR', options);
      return `Le ${formatted.replace('.', '')}`;
    }
  },
}
</script> 