<template>
    <div class="main p-7 h-full ms-1 md:w-2/4">
        <section class="flex my-auto">
            <button @click.prevent="$emit('removeComponent')" class="size bg-indigo-50 border border-indigo-100 p-2 rounded-md"><ArrowLeftIcon class="size-4" /></button>
            <div class="my-auto ms-3">
                <h4 class="font-bold">Modification de l'élève</h4>
                <p class="text-sm text-gray-400">Éditer et mettre à jour les informations de l'élève</p>
            </div>
        </section>

        <section class="mt-7 md:w-4/4 lg:w-4/5">
            <form class="form flex flex-col bg-white space-y-4 border-2 border-gray-100 rounded-lg p-4 h-full">
                <div class="form-group flex flex-col gap-1">
                    <label for="names" class="text-gray-900 text-sm">Nom</label>
                    <input v-model="student.nom" type="text" placeholder="Nom complet de l'élève" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                </div>

                <div class="w-full flex gap-2">
                    <div class="form-group w-1/2 flex flex-col gap-1">
                        <label for="names" class="text-gray-900 text-sm">Classe</label>
                        <select v-model="student.classe.niveau" class="gedInput font-medium  text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                            <option v-for="classe in classes" :key="classe.id" :value="classe.niveau">{{classe.niveau}}</option>
                        </select>
                    </div>

                    <div class="form-group w-1/2 flex flex-col gap-1">
                        <label for="names" class="text-gray-900 text-sm">Option</label>
                        <select v-model="student.option" class="gedInput font-medium  text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                            <option v-for="option in options" :key="option  " :value="option">{{option}}</option>
                        </select>
                    </div>
                </div>

                <div class="form-group flex flex-col gap-1">
                    <label for="names" class="text-gray-900 text-sm">Sexe</label>
                    <select v-model="student.sexe" class="gedInput font-medium  text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                    </select>
                </div>

                <div class="w-full flex gap-2">
                    <div class="form-group w-1/3 flex flex-col gap-1">
                        <label for="names" class="text-gray-900 text-sm">Date de naissance</label>
                        <input v-model="student.dateNaissance" type="date" placeholder="Date de naissance" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                        {{ formaterDate }}
                    </div>

                    <div class="form-group w-2/3 flex flex-col gap-1">
                        <label for="names" class="text-gray-900 text-sm">Adresse</label>
                        <input v-model="student.adresse" type="text" placeholder="Date de naissance" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                    </div>
                </div>


                <section class="w-full bg-white shadow shadow-indigo-300 border-2 p-3 border-gray-100 rounded-2xl flex flex-col h-full gap-3">
                    <div class="w-full"><h4 class="text-indigo-800 text-sm">Personne à contacter</h4></div>

                    <div class="w-full flex gap-2 mt-3">
                        <div class="form-group w-1/2 flex flex-col gap-1">
                            <label for="names" class="text-gray-900 text-sm">Nom</label>
                            <input v-model="student.contacts[0].nom" type="text" placeholder="Nom de la personne à contacter" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                        </div>

                        <div class="form-group w-1/2 flex flex-col gap-1">
                            <label for="names" class="text-gray-900 text-sm">Relation</label>
                            <select v-model="student.contacts[0].relation" class="gedInput font-medium  text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                                <option value="Parent">Parent</option>
                                <option value="Frère">Frère</option>
                                <option value="Soeur">Soeur</option>
                                <option value="Tuteur">Tuteur</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group flex flex-col gap-1">
                        <label for="names" class="text-gray-900 text-sm">Numéro de téléphone</label>
                        <input v-model="student.contacts[0].telephone" type="text" placeholder="Numéro à contacter" class="gedInput font-medium text-sm border border-gray-200 bg-gray-100 p-2 rounded-md">
                    </div>
                </section>

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

                <div class="flex flex-col relative p-3">
                    <button
                        @click.prevent="saveChange()"
                        :disabled="loading"
                        class="mt-4 bg-black p-3 rounded-md text-white hover:bg-gray-800 disabled:bg-gray-500 flex items-center justify-center space-x-2 w-full"
                        >
                        <ArrowPathIcon class="size-6 text-white animate-spin" v-if="loading"  />
                        <ArrowDownOnSquareIcon class="size-5" />
                        <span v-if="!loading">Enregistrer les modifications</span>
                    </button>
                </div>
                
            </form>

            <section v-if=false class="rightSide flex flex-col align-middle justify-center w-2/3 overflow-hidden">
               <div class="flex justify-center text-center"><img src="../assets/img/heroIllustration.png" class="max-w-3xl mb-10" /></div>
            </section>
        </section>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios';
import ToastSuccess from './ToastSuccess.vue'
import { ArrowLeftIcon, ArrowDownOnSquareIcon, ArrowPathIcon, } from '@heroicons/vue/20/solid';

export default {
    components: {ArrowLeftIcon, ArrowDownOnSquareIcon, ArrowPathIcon, ToastSuccess},
    props: ['student'],
    name: 'StudentsAdd',
    data() {
        return {
            loading: false,
            errors: [],
            // student: {
            //     nom: "",
            //     classe: "",
            //     option: "",
            //     sexe: "",
            //     contacts: [
            //         {
            //             nom: '',
            //             relation: '',
            //             telephone: '0'
            //         }
            //     ],
            // },
            studentTemplate: {
                nom: "",
                classe: "",
                option: "",
                sexe: "",
                contacts: [
                    {
                        nom: '',
                        relation: '',
                        telephone: '0'
                    }
                ],
            },
            classes: [],
            alertVar: false
        }
    },
    computed: {
        ...mapGetters(['baseURL']), 
         options() {
            let opt = null;
            if (this.student.classe) {
                opt = this.classes.find(classe =>  classe.niveau === this.student.classe.niveau).nom_options.sort();
            } else {
                opt = [];
            } 
            
            return opt
        },
        formaterDate() {
            let dateNaissance = new Date(this.student.dateNaissance)
            let month = dateNaissance.getMonth() + 1;
            let day = dateNaissance.getDay();

            month = month.toString().length == 1 ? `0${month}` : month;
            day = day.toString().length == 1 ? `0${day}` : day;

            return  `${month}/${day}/${dateNaissance.getFullYear()}`;
            //this.student.dateNaissance = retour;

            //return retour;
        }
    },
    methods: {
        getClasses() {
            this.loading = true;
            axios.get(`${this.baseURL}/classe/getClasses`)
            .then(response => {
                this.classes = response.data;
                this.error = null;
            })
            .catch(err => {
                this.error = err.message;
            })
            .finally(() => {
                this.loading = false;
            });
        },
        saveChange() {
            this.loading = true;
            this.errors = []
            // Vérifier que tous les champs sont remplis
            if (
                this.student.nom.trim() === '' ||
                this.student.classe === '' ||
                this.student.option.trim() === '' ||
                this.student.sexe.trim() === '' ||
                this.student.contacts[0].nom.trim() === '' ||
                this.student.contacts[0].relation.trim() === '' ||
                this.student.contacts[0].telephone.trim() === ''
            ) {
                this.errors.push({message: 'Tous les champs sont obligatoires.', v: true, kind: 'error'});
            }

            // Mettre la première lettre de chaque mot du nom en majuscule
            this.student.nom = this.student.nom
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Vérifier que le numéro de téléphone ne dépasse pas 10 caractères
            if (this.student.contacts[0].telephone.length > 10) {
                this.errors.push({message: 'Le numéro de téléphone ne doit pas dépasser 10 chiffres.', v: true, kind: 'error'});
                this.loading = false;
            }
            if (this.student.contacts[0].telephone.length < 10) {
                this.errors.push({message: 'Le numéro de téléphone doit avoir 10 chiffres.', v: true, kind: 'error'});
                this.loading = false;
            }

            // S'il n'y a pas d'erreurs, enregistrer l'étudiant
            if (this.errors.length === 0) {
                // Effectuer l'enregistrement de l'étudiant
                axios.patch(`${this.baseURL}/student/${this.student._id}/update`, this.student)
                .then(response => {
                    this.errors.push({message: `L'élève ${this.student.nom.toUpperCase() } a été mis à jour avec succès !`, v: true, kind: 'success'});
                })
                .catch(err => {
                    this.error = err.message;
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        }
    },
    async beforeMount() {
        console.log(this.student)
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