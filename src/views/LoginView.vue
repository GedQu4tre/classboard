<template>
  <div class="flex h-screen flex-col justify-center items-center">
        <div class="flex flex-col my-5 w-2/6 text-center">
            <div class="flex justify-center mb-5">
                <img src="../assets/img/vortexIcon.png" alt="Vortex" width="40">
            </div>
            <label class="text-2xl font-bold text-center text-black">Connexion</label>
            <small class="text-gray-500">Entrer vos coordonnées pour vous connecter</small>
        </div>

        <form @submit="onSubmit" class="mt-3 lg:w-2/6 md:w-3/6">
            <div class="grid gap-2">
                <div class="grid gap-1">
                <label class="sr-only" for="email">
                    Nom d'utilisateur
                </label>
                <input
                    v-model="username"
                    id="email"
                    placeholder="ex: gequ4tre"
                    type="text"
                    auto-correct="off"
                    :disabled="isLoading"

                    class="bg-gray-100 p-3 rounded-md  ring-1 ring-gray-200"
                />
                </div>

                <div class="grid gap-1">
                <label class="sr-only" for="email">
                    Mot de passe
                </label>
                <input
                    v-model="password"
                    id="password"
                    placeholder="Mot de passe"
                    type="password"
                    auto-capitalize="none"
                    auto-correct="off"
                    :disabled="isLoading"

                    class="bg-gray-100 p-3 rounded-md ring-1 ring-gray-200"
                />
                </div>


                  <p class="mt-4 text-center text-sm text-red-500">{{ error }}</p>

                <button
                  @click.prevent="login"
                  :disabled="isLoading"
                  class="mt-4 bg-black p-3 rounded-md text-white hover:bg-gray-800 disabled:bg-gray-500 flex items-center justify-center space-x-2 w-full"
                >
                  <ArrowPathIcon class="size-6 text-white animate-spin" v-if="isLoading"  />
                  <span v-if="!isLoading">Se connecter</span>
                </button>

                <label class="text-center font-light mt-4 px-10 text-gray-500">
                    En cliquant sur se connecter, vous acceptez nos <u>termes</u> et <u>conditions d'utilisation.</u> 
                </label>
            </div>
        </form>
    </div>
</template>

<script>
import {ArrowPathIcon, } from '@heroicons/vue/24/solid'
export default {
  components: {ArrowPathIcon, },
  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        this.error = null;
        this.isLoading = true;

        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        });
        
        this.isLoading = false;
        this.$router.push('/admin'); // Redirige vers le tableau de bord après connexion

      } catch (err) {
        this.isLoading = false;
        this.error = err.message;
      }

    },
  },
  watch: {
    username() {
      this.error = null;
    },
    password() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
input {
  font-family: fira sans;
}
</style>