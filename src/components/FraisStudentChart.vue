<template>
  <div class="w-full flex justify-center">
    <ApexChart
      type="pie"
      width="400"
      :options="chartOptions"
      :series="dataChart"
    ></ApexChart>
  </div>
</template>

<script>
import ApexChart from 'vue3-apexcharts';

export default {
  components: {ApexChart},
  props: ['dataChart'],
  data() {
    return {
      // Données factices pour le pie chart
      series: [60, 40],// 60% payés, 40% non payés

      // Configuration du chart
      chartOptions: {
        labels: ['Payés', 'Non Payés'],
        colors: ['#3730a3', '#ef4444'], // Couleurs pour les sections du graphique
        chart: {
          type: 'pie',
        },
        legend: {
          position: 'bottom',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      }
    }
  }
}
</script>

<style scoped>
/* Ajouter des styles personnalisés ici si nécessaire */
</style>
