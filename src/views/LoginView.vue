<template>
  <main class="w-full flex justify-around">
    <div
      class="logoSide relative flex-1 hidden items-center justify-center bg-gray-900 h-screen lg:flex"
    >
      <div class="relative z-10 w-full max-w-md">
        <h4 class="text-2xl flex gap-2 font-bold text-indigo-400">
          <GlobeAltIcon class="size-7 my-auto text-indigo-400" /> Classboard
        </h4>

        <div class="mt-16 space-y-3">
          <h3 class="text-white text-3xl font-bold">
            Rejoignez-nous en ouvrant votre compte
          </h3>
          <p class="text-gray-300">
            Créez un compte et rejoingnez-nous dans cette grande avanture.
            Accédez à notre plateforme pour une période d'essaie de 30 jours
            avec des fonctionnalités limitées.
          </p>
        </div>
      </div>
    </div>

    <div
      class="absolute inset-0 blur-xl h-[580px]"
      :style="{
        background: 'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.20) 40.92%, rgba(204, 171, 238, 0) 70.35%)',
      }"
    ></div>

    <div class="flex-1 flex items-center justify-center h-screen">
      <div
        class="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0"
      >
        <div class="">
          <img
            src="https://floatui.com/logo.svg"
            width="150"
            class="lg:hidden"
          />
          <div class="mt-5 space-y-2">
            <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
              S'inscrire
            </h3>
            <p class="">
              Alvez-vous déjà un compte ?
              <a
                href="javascript:void(0)"
                class="font-medium text-indigo-800 hover:text-indigo-800"
                >Se connecter</a
              >
            </p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-x-3">
          <button
            class="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <!-- Comment: Google Icon SVG here -->
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
              alt="Google"
              class="w-5 h-5"
            />
          </button>
          <button
            class="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <!-- Comment: Twitter Icon SVG here -->
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/f7119b9bdd8c58864383802fb92c7fc3a25c0646/twitter-icon.svg"
              alt="Twitter"
              class="w-5 h-5"
            />
          </button>
          <button
            class="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <!-- Comment: GitHub Icon SVG here -->
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/0d3b55a09c6bb8155ca19f43283dc6d88ff88bf5/github-icon.svg"
              alt="Github"
              class="w-5 h-5"
            />
          </button>
        </div>
        <div class="relative">
          <span class="block w-full h-px bg-gray-300"></span>
          <p
            class="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"
          >
            Ou continuer avec
          </p>
        </div>
        <form onSubmit="event.preventDefault()" class="space-y-5">
          <div>
            <label class="font-medium">Nom</label>
            <input
              type="text"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-800 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label class="font-medium">Adresse mail</label>
            <input
              type="email"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-800 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label class="font-medium">Mot de passe</label>
            <input
              type="password"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-800 shadow-sm rounded-lg"
            />
          </div>
          <button
            class="w-full px-4 py-2 text-white font-medium bg-indigo-800 hover:bg-indigo-500 active:bg-indigo-800 rounded-lg duration-150"
          >
            Créer un compte
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { GlobeAltIcon } from "@heroicons/vue/20/solid";
export default {
  components: { GlobeAltIcon },
  name: "LoginView",
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
