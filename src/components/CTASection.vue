<template>
    <section class="py-14" id="ctasection">
      <div class="max-w-screen-xl mx-auto md:px-8">
          <div class="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div class="flex-1 sm:hidden lg:block">
                  <img src="../assets/img/childrens2.jpg" class="md:max-w-lg sm:rounded-lg" alt="">
              </div>
              <div class="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                  <h3 class="text-indigo-600 font-semibold">
                      Services professionnels
                  </h3>
                  <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Simplifiez la gestion de votre école avec classboard
                  </p>
                  <p class="mt-3 text-gray-600">
                    Rejoignez nos clients satisfaits - contactez-nous dès maintenant pour découvrir comment notre expertise peut simplifier la gestion de votre établissement.
                  </p>
                  <a href="javascript:void(0)" class="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                      En apprendre plus
                      <ArrowRightIcon class="size-6"></ArrowRightIcon>
                  </a>
              </div>
          </div>
      </div>
    </section>
  </template>

  <script>
import { ArrowRightIcon } from '@heroicons/vue/20/solid'
export default {
    components: {ArrowRightIcon}
}
</script>