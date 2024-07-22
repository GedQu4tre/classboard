<template>
    <main class="py-14" id="contact">
      <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div class="max-w-xl space-y-3">
          <h3 class="text-indigo-600 font-semibold">Contacts </h3>
          <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Dites-nous comment nous pouvons vous aider
          </p>
          <p>
            Nous avons hâte d'avoir de vos nouvelles. N'hésitez pas à nous contacter, nous serons ravis de vous aider.
          </p>
        </div>
        <div>
          <ul class="mt-12 flex flex-wrap gap-x-12 gap-y-6 items-center lg:gap-x-24">
            <li v-for="(item, idx) in contactMethods" :key="idx">
              <h4 class="text-gray-800 text-lg font-medium">{{ item.title }}</h4>
              <div class="mt-3 flex items-center gap-x-3">
                <component class="flex-none text-gray-400 size-5" :is="item.icon"></component>
                <p>{{ item.contact }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { MapPinIcon, PhoneIcon, EnvelopeIcon} from '@heroicons/vue/24/outline'
  export default {
    components: {MapPinIcon, PhoneIcon, EnvelopeIcon },
    name: 'ContactComponent',
    data() {
      return {
        contactMethods: [
          {
            icon: MapPinIcon,
            contact: "Route Lubumbashi, Numéro 1, Q. Kitabataba",
            title: "Notre bureau"
          },
          {
            icon: PhoneIcon,
            contact: "+243 831 881 835",
            title: "Téléphone"
          },
          {
            icon: EnvelopeIcon,
            contact: "gedeon.kongolo@gedindustries.tech",
            title: "Email"
          },
        ]
      }
    }
  }
  </script>