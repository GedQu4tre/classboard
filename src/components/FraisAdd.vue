<template>
    <div class="p-7 flex flex-col h-full ms-10">
        <section class="flex my-auto">
            <button @click.prevent="$emit('removeComponent')" class="size bg-indigo-50 border border-indigo-100 p-2 rounded-md"><ArrowLeftIcon class="size-4" /></button>
            <div class="my-auto ms-3">
                <h4 class="font-bold">Ajouter un nouveau frais</h4>
                <p class="text-sm text-gray-400">Formulaire pour ajouter un nouveau frais</p>
            </div>
        </section>

        <section class="mt-7 flex flex-grow">
            <form class="form min-h-[80vh] max-h-[80vh] overflow-y-auto lg:w-1/3 md:w-2/3 bg-white space-y-4 border-2 border-gray-100 rounded-lg p-4">
                <div class="form-group flex flex-col gap-1">
                    <label for="nom" class="text-gray-900 text-sm">Nom</label>
                    <input v-model="frais.nom" type="text" placeholder="Nom du frais" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                </div>

                <div class="form-group flex flex-col gap-1">
                    <label for="date_limite" class="text-gray-900 text-sm">Date limite (Date de recouvrement)</label>
                    <input v-model="frais.date_limite" type="date" placeholder="Date de recouvrement" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                </div>

                <div class="form-group flex flex-col gap-1">
                    <label for="description" class="text-gray-900 text-sm">Description</label>
                    <textarea v-model="frais.description" placeholder="Une description pour vous permettre de vous souvenir à quoi sert ce frais" cols="30" rows="2" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md"></textarea>
                </div>

                <div class="form-group flex flex-col gap-1">
                    <label for="montant" class="text-gray-900 text-sm">Montant</label>
                    <input v-model="frais.montant" type="number" placeholder="Montant en USD" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                </div>

                <div class="form-group flex flex-col gap-1">
                    <label for="classes" class="text-gray-900 text-sm">Classes</label>
                    <select v-model="selectedClasse" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                        <option v-for="classe in classes" :key="classe.id" :value="classe">{{ classe.niveau }}</option>
                    </select>
                </div>

                <div v-if="selectedClasse" class="form-group flex flex-col gap-1">
                    <label for="options" class="text-gray-900 text-sm">Options</label>
                    <select v-model="selectedOptions" multiple class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                        <option @click.prevent="selectAllOption" class="text-indigo-600">Tout selectionner</option>
                        <option v-for="option in options" :key="option" :value="option" class="ps-6">{{ option }}</option>
                    </select>
                </div>

                <div class="flex justify-end">
                    <button @click.prevent="addClassOption" class="btn rounded-md bg-indigo-800 text-indigo-50 flex justify-center align-center text-sm font-medium py-1 px-4">
                        Ajouter Classe & Option
                    </button>
                </div>

                <div v-if="frais.classes.length" class="mt-4 min-h-fit overflow-auto">
                    <div class="flex justify-between">
                        <h4 class="text-gray-900 text-sm font-medium">Classes concernées</h4>
                        <small class="btn btn-sm">{{ frais.classes.length }} classe{{ frais.classes.length > 1 ? 's' : '' }}</small>
                    </div>

                    <div v-for="(classe, index) in frais.classes" :key="classe._id" class="border rounded-md mb-2">
                        <!-- Accordéon Header -->
                        <div @click="toggleClasse(index)" class="flex justify-between cursor-pointer bg-gray-200 p-2">
                            <span>{{ classe.niveau }}</span>
                            <small>{{ classe.nom_options.length }} option(s)</small>
                            <button title="Supprimer la classe" @click.stop.prevent="removeClasse(index)" class="text-red-500 text-xs"><TrashIcon class="size-4" /></button>
                        </div>

                        <!-- Accordéon Content -->
                        <div v-if="classe.isOpen" class="p-3">
                            <ul class="list-disc list-inside">
                                <li v-for="(option, optionIndex) in classe.nom_options" :key="option" class="flex justify-between">
                                    <small>{{ option }}</small>
                                    <button @click.prevent="removeOption(index, optionIndex)" class="text-xs"><XMarkIcon class="size-5" /></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col relative p-3">
                    <button v-if="!loading" @click.prevent="saveFrais()" class="btn rounded-md bg-indigo-800 text-indigo-50 flex justify-center align-center text-sm font-medium py-2 mt-auto">
                        <ArrowDownOnSquareIcon class="size-5" />
                        <span class="mt-0.5 ms-2">Enregistrer</span>
                    </button>
                    <button v-else class="btn flex justify-center rounded-md bg-indigo-800 text-indigo-50 text-sm font-medium py-2 mt-auto"><div class="loader text-white"></div></button>
                </div>
            </form>

            <div v-if="errors.length > 0">
                <ul class="absolute -end-1 bottom-7 right-7">
                    <li v-for="e in errors" :key="e.message" class="-end-1 my-2">
                        <ToastSuccess
                            :variant="e.kind" 
                            :message="e.message"
                            v-if="e.v"
                            @closeToast="e.v = false"
                        >
                        </ToastSuccess>
                    </li>
                </ul>
            </div>
        </section>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { ArrowLeftIcon, ArrowDownOnSquareIcon, TrashIcon, XCircleIcon } from '@heroicons/vue/20/solid';
import { XMarkIcon } from '@heroicons/vue/24/outline'
import ToastSuccess from './ToastSuccess.vue'

export default {
    components: { ArrowLeftIcon, ArrowDownOnSquareIcon, TrashIcon, XCircleIcon, XMarkIcon, ToastSuccess },
    name: 'FraisAdd',
    data() {
        return {
            frais: {
                nom: "",
                montant: 0,
                description: '',
                classes: [],
                date_limite: '',
                ecole: null
            },
            classes: [],
            selectedClasse: null,
            selectedOptions: [],
            errors: [],
            loading: false,
        }
    },
    computed: {
        ...mapGetters(['baseURL', 'currentUser']),
        options() {
            let opt = null;
            if (this.selectedClasse) {
                opt = this.classes.find(classe =>  classe._id === this.selectedClasse._id).nom_options.sort();
            } else {
                opt = [];
            } 
            console.log(opt)

            return opt;
        }
    },
    methods: {
        getClasses() {
            axios.get(`${this.baseURL}/classe/getClasses`)
            .then(response => {
                console.log(response.data.length)
                this.classes = response.data;
            })
            .catch(err => {
                console.error(err);
            });
        },
        addClassOption() {
            // Vérifier si la classe existe déjà dans le tableau
            const existingClasse = this.frais.classes.find(classe => 
                classe._id === this.selectedClasse._id || classe.niveau === this.selectedClasse.niveau
            );

            if (existingClasse) {
                // Si la classe existe, ajouter uniquement les options sélectionnées sans doublons
                existingClasse.nom_options = [...new Set([...existingClasse.nom_options, ...this.selectedOptions])];
            } else {
                // Si la classe n'existe pas, ajouter une nouvelle entrée dans le tableau
                this.frais.classes.push({
                    _id: this.selectedClasse._id, 
                    niveau: this.selectedClasse.niveau, 
                    nom_options: [...this.selectedOptions]
                });
            }

            // Réinitialiser les sélections
            this.selectedClasse = null;
            this.selectedOptions = [];
        },
        // Méthode pour ouvrir ou fermer l'accordéon pour chaque classe
        toggleClasse(index) {
            // Au lieu d'utiliser $set, on peut simplement utiliser le pointage direct
            if (this.frais.classes[index].isOpen === undefined) {
                this.frais.classes[index].isOpen = true; // Définit une première fois si non défini
            } else {
                this.frais.classes[index].isOpen = !this.frais.classes[index].isOpen; // Alterne entre ouvert/fermé
            }
        },
        selectAllOption() {
            this.selectedOptions = this.selectedClasse.nom_options;
        },
        // Méthode pour supprimer une classe
        removeClasse(index) {
            this.frais.classes.splice(index, 1);
        },

        // Méthode pour supprimer une option spécifique d'une classe
        removeOption(classIndex, optionIndex) {
            this.frais.classes[classIndex].nom_options.splice(optionIndex, 1);

            // Si plus d'options, supprimer la classe automatiquement
            if (this.frais.classes[classIndex].nom_options.length === 0) {
                this.removeClasse(classIndex);
            }
        },
        async saveFrais() {
            
            // Réinitialiser les erreurs
            this.loading = true;
            this.errors = [];

            // Vérification des champs obligatoires
            if (!this.frais.nom) {
                this.errors.push({message: "Le nom du frais est requis.", v: true, kind: 'error'});
            }

            if (!this.frais.montant || this.frais.montant <= 0) {
                this.errors.push({message: "Le montant doit être un nombre positif.", v: true, kind: 'error'});
            }

            if (!this.frais.date_limite) {
                this.errors.push({message: "Vous devez choisir une date limite ou date de recouvrement", v: true, kind: 'error'});
            }

            if (this.frais.classes.length === 0) {
                this.errors.push({message: "Au moins une classe doit être sélectionnée.", v: true, kind: 'error'});
            }

            // Si des erreurs existent, ne pas continuer
            if (Object.keys(this.errors).length > 0) {
                this.loading = false;
                return;
            }

            try {
                // S'il n'y a pas d'erreurs, enregistrer l'étudiant
                if (this.errors.length === 0) {

                    // Effectuer l'enregistrement de l'étudiant
                    axios.post(`${this.baseURL}/frais/create`, this.frais)
                    .then(response => {
                        this.frais = {
                            nom: '',
                            montant: null,
                            classes: []
                        };
                        this.errors.push({message: `Le frais "${this.frais.nom }" a été ajouté avec succès !`, v: true, kind: 'success'});
                    })
                    .catch(err => {
                        this.error = err.message;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
                }
            } catch (error) {
                console.error("Erreur :", error);
                this.errors.api = "Erreur lors de l'enregistrement du frais.";
            }
        }
    },
    mounted() {
        this.frais.ecole = this.currentUser.ecole;
        console.log(this.frais)
        this.getClasses();
    }
}
</script>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  -webkit-mask: radial-gradient(circle closest-side at 50% 40%,#0000 94%, #000);
  transform-origin: 50% 40%;
  animation: l25 1s infinite linear;
}
@keyframes l25 {
  100% {transform: rotate(1turn)}
}
</style>
