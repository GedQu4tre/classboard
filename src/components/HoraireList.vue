<template>
    <div class="p-6 max-w-7xl mx-auto">
      <!-- Barre supérieure -->
      <div class="flex justify-between items-center mb-4">
        <button @click="previousMonth" class="text-blue-500">Précédent</button>
        <h1 class="text-xl font-bold">{{ currentMonth }}</h1>
        <button @click="nextMonth" class="text-blue-500">Suivant</button>
      </div>
  
      <!-- Calendrier -->
      <div class="grid grid-cols-7 gap-4">
        <div v-for="day in daysOfWeek" :key="day" class="text-center font-semibold">{{ day }}</div>
  
        <div v-for="day in daysInMonth" :key="day.date" class="border p-2 relative">
          <div class="font-bold">{{ day.day }}</div>
          <div v-for="event in day.events" :key="event.id" class="text-sm bg-blue-200 mt-2 rounded">
            {{ event.title }}
          </div>
        </div>
      </div>
  
      <!-- Modale pour ajouter ou éditer un événement (optionnel) -->
      <modal v-if="showModal" @close="closeModal">
        <form @submit.prevent="saveEvent">
          <input v-model="newEvent.title" placeholder="Titre de l'événement" class="border p-2 w-full" />
          <input type="date" v-model="newEvent.date" class="border p-2 w-full mt-2" />
          <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded">Enregistrer</button>
        </form>
      </modal>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      events: [
        { id: 1, title: 'Réunion Parents', date: '2024-10-20' },
        { id: 2, title: 'Examen', date: '2024-10-15' }
      ],
      showModal: false,
      newEvent: {
        title: '',
        date: ''
      }
    };
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    },
    daysInMonth() {
      const start = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      const end = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
      const days = [];
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
          day: d.getDate(),
          date: d.toISOString().split('T')[0],
          events: this.events.filter(e => e.date === d.toISOString().split('T')[0])
        });
      }
      return days;
    }
  },
  methods: {
    previousMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
    closeModal() {
      this.showModal = false;
    },
    saveEvent() {
      this.events.push({ ...this.newEvent, id: this.events.length + 1 });
      this.newEvent = { title: '', date: '' };
      this.closeModal();
    }
  }
};
</script>
