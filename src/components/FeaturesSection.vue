<template>
    <section class="py-14" id="features">
      <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div class="relative max-w-2xl mx-auto sm:text-center">
          <div class="relative z-10">
            <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Ce que nous vous proposons
            </h3>
            <p class="mt-3">
              Découvrez comment notre solution peut vous faire gagner du temps <br> et vous permettre de vous consacrer pleinement à votre mission éducative.
            </p>
          </div>
          <div
            class="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style="background: linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%);"
          ></div>
        </div>
        <div class="relative mt-12">
          <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <li
              v-for="feature in features"
              :key="feature.title"
              class="bg-white space-y-3 p-4 border rounded-lg"
            >
              <component
                class="flex items-center mb-4 size-6 text-purple-800"
                :is="feature.icon"
              ></component>
              <h5 class="text-lg font-semibold text-gray-800">{{ feature.title }}</h5>
              <p class="mt-2 text-base line-clamp-4">{{ feature.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import {UserGroupIcon, UserIcon, ChartBarIcon, CurrencyDollarIcon, CalendarIcon, AdjustmentsHorizontalIcon} from '@heroicons/vue/24/outline'
  export default {
    components: {UserGroupIcon, UserIcon, ChartBarIcon, CurrencyDollarIcon, CalendarIcon, AdjustmentsHorizontalIcon},
    name: 'FeaturesSection',
    data() {
      return {
        features: [
          {
            icon: UserGroupIcon,
            title: 'Gestion des inscriptions',
            desc: 'Gérez les inscriptions et suivez les dossiers étudiants. Facilitez le processus d\'admission et gardez une trace détaillée de chaque élève inscrit.'
          },
          {
            icon: UserIcon,
            title: 'Gestion des enseignants',
            desc: 'Gérez les informations et les attributions des enseignants. Suivez les qualifications, les heures de cours et les emplois du temps de chaque professeur pour une meilleure organisation.'
          },
          {
            icon: ChartBarIcon,
            title: 'Gestion des notes et évaluations',
            desc: 'Gérez de manière avancée les notes et évaluations des étudiants. Suivez les progrès de chaque élève, générez des rapports détaillés et partagez les résultats avec les parents.'
          },
          {
            icon: CurrencyDollarIcon,
            title: 'Gestion des frais et paiements',
            desc: 'Gérez les frais de scolarité et les paiements des étudiants. Suivez l\'historique des paiements, envoyez des rappels et générez des reçus pour une meilleure transparence financière.'
          },
          {
            icon: CalendarIcon,
            title: 'Planification des emplois du temps',
            desc: 'Planifiez et gérez les emplois du temps des cours. Répartissez efficacement les salles, les enseignants et les créneaux horaires pour une organisation optimale.'
          },
          {
            icon: 'AdjustmentsHorizontalIcon',
            title: 'Personnalisation avancée',
            desc: 'Personnalisez l\'application selon vos besoins spécifiques. Configurez les paramètres, les modèles de documents, les rapports et bien plus pour une expérience sur-mesure.'
          }
        ]
      };
    },
  };
  </script>