<template>
  <div class="w-full flex bg-white p-8 overflow-hidden">
    <div class="flex leftSide w-3/4">
      <span class="items-start block h-10">
      <button @click.prevent="$emit('removeComponent')" class="my-auto bg-gray-50 rounded-lg hover:bg-gray-200 ring-1 ring-gray-100 p-3">
        <ArrowLeftIcon class="size-5" title="Retour à la page précédente"/>
      </button>
      </span>

      <div class="flex flex-col w-full">
        <!-- Header Section -->
        <div class="px-4">
          <div class="flex flex-row font-bold items-center">
            <small class="badge text-blue-500">Aperçu frais</small>
            <button class="ms-4 bg-gray-50 ring ring-gray-100 p-2 rounded-lg" @click.prevent="$emit('showUpdateStudent')" >
              <PencilIcon class="size-4" title="Modifier les informations de l'élève"/>
            </button>
          </div>
          <h2 class="mainTitle text-5xl font-medium mb-6">
            {{formattedName.nom}}
            <br>
            {{formattedName.postnom}} <span v-if="formattedName.prenom"> {{ formattedName.prenom }}</span>
            <button  v-if="false"
              @click.prevent="$emit('showUpdateStudent')" 
              title="Modifier les informations" 
              class="bg-gray-300 hover:bg-black hover:text-white text-black p-3 mt-[-10%] rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
            >
              <PencilIcon class="size-5" />
            </button>
            <small class="ms-5 mb-2 inline-flex w-1/3 text-transparent border border-b-gray-100"> </small>
          </h2>
        </div>

        <!-- component section -->
        <StudentFeesDetail ref="studentFeesDetail" :student="student" @selectFee="feeClicked"></StudentFeesDetail>
    

        <!-- Footer Section -->
        <div class="flex w-[95%] items-center justify-between mt-8 ring-1 ring-gray-300 bg-gray-100 p-4 rounded-2xl">
          <div class="flex items-center space-x-3">
            <img 
              src="../assets/img/gedindustries_black.png" 
              alt="Avatar" 
              class="w-50 h-12"
            />
            <span class="text-sm text-gray-700 ps-12">
              Passez à la version premium. <span class="text-black font-bold">Choisissez la qualité</span>
            </span>
          </div>
          <button class="flex items-center text-white px-10 py-4 rounded-lg bg-black transition text-xs font-bold">
            Nous contacter
          </button>
        </div>
      </div>
    </div>

    <div v-if="!currentFee"  class="rightSide w-1/4 banner p-7  text-black flex rounded-2xl flex-col">
      <img src="../assets/img/vortexMonochrome.png" width="80" class=""  alt="Vortex">
      <h4 class="text-md mt-4 font-medium text-white">Rejoingnez-nous sur nos plateforme: <i class="text-blue-500 font-medium text-italic">vortex_drc</i></h4>

      <p class="mt-auto lien-clamp-2 pb-7"><span class="text-blue-500 font-bold mainTitle">Classboard</span> est une plateforme de gestion scolaire intégré dans la suite logiciel Vortex qui possède de logiciel de gestion dans d'autres domaines.</p>

      <img src="../assets/img/gedindustries_black.png" width="100" class="mb-4"  alt="Vortex">

    </div>

    <FraisPrint ref="printable" v-if="currentFee" @feesUpdated="reloadFees"  @cancelPrinter="currentFee = null" :student="student" :currentFrais="currentFee"></FraisPrint>
    
  </div>
</template>

<script>
import { CheckCircleIcon, PencilIcon, FaceFrownIcon, XCircleIcon, ArrowLeftIcon, ArrowsRightLeftIcon, PrinterIcon } from '@heroicons/vue/24/solid';
import StudentFeesDetail from './StudentFeesDetail.vue';
import FraisPrint from './FraisPrint.vue';

export default {
  name: 'StudentsDetail',
  components: { CheckCircleIcon, PencilIcon, FaceFrownIcon, XCircleIcon, ArrowLeftIcon, ArrowsRightLeftIcon, StudentFeesDetail, PrinterIcon, FraisPrint },
  emits: ['selectFee'],
  props: ['student'],
  data() {
    return {
      currentFee: null,
      avatars: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],

    };
  },
  computed: {
    formattedName() {
      const parts = this.student.nom.split(" ");
      const nom = parts[0]; // Le premier élément est toujours le nom
      const postnom = parts[1] || ""; // Le second élément, si disponible
      const prenom = parts[2] || ""; // Le troisième élément, si disponible
      return { nom, postnom, prenom };
    },
  },
  methods: {
    feeClicked(fee) {
      this.currentFee = fee;
    },
    reloadFees(fee) {
      this.$refs.studentFeesDetail.getGrillePaiement()
    }
  },
};
</script>

<style scoped>
.mainTitle {
  font-family: poppins;
}
.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.2) 3%, rgb(233, 233, 233)), url('../assets/img/bg4.jpg');
  background-size: cover;
  background-blend-mode:luminosity(50)
}
</style>
