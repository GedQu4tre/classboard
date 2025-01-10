<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <!-- Icon Section -->
      <div class="flex items-center justify-center bg-gray-200 rounded-full w-24 h-24">
        <LockClosedIcon class="h-12 w-12 text-black" />
      </div>
  
      <!-- Title -->
      <h1 class="mt-6 text-3xl font-bold text-gray-900">Fonctionnalité Premium</h1>
  
      <!-- Description -->
      <p class="mt-4 text-gray-600 text-center max-w-md">
        Cette fonctionnalité est réservée aux utilisateurs de la version premium. 
        Passez à la version premium pour débloquer toutes les fonctionnalités de la plateforme.
      </p>
  
      <!-- Buttons -->
      <div class="mt-8 flex space-x-4">
        <button class="px-12 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900 transition">
          Passer en Premium
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { LockClosedIcon } from "@heroicons/vue/24/solid";
  
  export default {
    components: {
      LockClosedIcon,
    },
  };
  </script>
  
  <style>
  /* You can extend TailwindCSS styles here if needed */
  </style>
  