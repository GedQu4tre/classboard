<template>
    <section class="relative py-14" id="testimonies">
      <div class="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
          <div class="max-w-xl sm:text-center md:mx-auto">
              <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Écoutez ce que disent nos clients
              </h3>
              <p class="mt-3 text-gray-600">
                Découvrez les retours d'expérience et les témoignages de nos clients satisfaits. Ils partagent leur avis sur la qualité de nos produits, la fiabilité de notre service et la facilité d'utilisation de notre solution. 
              </p>
          </div>
          
            <div class="mt-12">
                <ul class="grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <li v-for="testimonial in testimonials" :key="testimonial.id" class="bg-white rounded-xl border shadow-md">
                        <div class="p-4">
                            <ChatBubbleLeftRightIcon class="size-7 text-gray-300"></ChatBubbleLeftRightIcon>
                        </div>
                        <figure>
                        <blockquote>
                            <p class="text-gray-800 line-clamp-2 text-lg font-semibold px-4 py-1">{{ testimonial.quote }}</p>
                        </blockquote>
                        <div class="flex items-center gap-x-4 p-4 mt-6 bg-indigo-50">
                            <img :src="getImageUrl(testimonial.image)"  class="w-16 h-16 rounded-full border-2 border-indigo-800" />
                            <div>
                                <span class="block text-gray-800 font-semibold">{{ testimonial.name }}</span>
                                <span class="block text-indigo-800 text-sm mt-0.5">{{ testimonial.title }}</span>
                            </div>
                        </div>
                        </figure>
                    </li>
                </ul>
            </div>
      </div>
      <div class="absolute top-0 w-full h-[350px]" style="background: linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%);"></div>
    </section>
  </template>

  <script>
  import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
export default {
    components: {ChatBubbleLeftRightIcon},
    data() {
        return {
            testimonials: [
                {
                    id: 1,
                    quote: "Cet outil est la cérise sur le gâteau. Depuis que ce dernier est venu, tout est vraiment simplifié.",
                    image: "testimony1.jpg",
                    name: "Jean-Louis Kimba",
                    title: "Inspecteur Pool"
                },
                {
                    id: 2,
                    quote: "Je peux enfin avoir une vue d'ensemble sur toutes choses et cela en un click un mouvement.",
                    image: "testimony2.jpg",
                    name: "Samy Tambwe",
                    title: "Prefet C.S Le Palmier"
                },
                {
                    id: 3,
                    quote: "Il ne manquait plus que ça, un outil à la fois simple et facile à utiliser pour le bohneur des toutes les insitutions scolaires.",
                    image: "testimony3.png",
                    name: "Jessica Ilunga",
                    title: "Directrice des études"
                }
            ]
        }
    },
    methods: {
    getImageUrl(imageName) {
      return new URL(`../assets/img/${imageName}`, import.meta.url).href;
    }
  }
}
</script>