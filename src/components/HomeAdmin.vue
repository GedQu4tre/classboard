<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
    <!-- Navbar -->
    <header class="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white shadow-sm">
      <div class="flex items-center gap-4">
        <img src="../assets/img/vortex.png" alt="Logo" class="h-8">
        <h1 class="text-lg font-bold">Dashboard</h1>
      </div>
      <div class="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          class="bg-gray-200 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">Download</button>
        <img
          src="../assets/img/vortex.png"
          alt="User Avatar"
          class="w-8 h-8 rounded-full border border-gray-300"
        />
      </div>
    </header>

    <main class="flex-1 p-6">
      <!-- Top Statistics -->
      <div class="grid grid-cols-4 gap-6 mb-6">
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300">
          <h2 class="text-sm text-gray-500">Total Revenue</h2>
          <p class="text-xl font-bold text-gray-900">$45,231.89</p>
          <p class="text-sm text-green-600">+20.1% from last month</p>
        </div>
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300">
          <h2 class="text-sm text-gray-500">Subscriptions</h2>
          <p class="text-xl font-bold text-gray-900">+2350</p>
          <p class="text-sm text-green-600">+180.1% from last month</p>
        </div>
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300">
          <h2 class="text-sm text-gray-500">Sales</h2>
          <p class="text-xl font-bold text-gray-900">+12,234</p>
          <p class="text-sm text-green-600">+19% from last month</p>
        </div>
        <div class="bg-white p-4 rounded-md shadow-md border border-gray-300">
          <h2 class="text-sm text-gray-500">Active Now</h2>
          <p class="text-xl font-bold text-gray-900">+573</p>
          <p class="text-sm text-green-600">+201 since last hour</p>
        </div>
      </div>

      <!-- Chart and Recent Sales -->
      <div class="grid grid-cols-3 gap-6">
        <!-- Chart -->
        <div class="bg-white p-6 rounded-md shadow-md border border-gray-300 col-span-2">
          <h2 class="text-sm text-gray-500 mb-4">Overview</h2>
          <canvas id="overview-chart"></canvas>
        </div>
        <!-- Recent Sales -->
        <div class="bg-white p-6 rounded-md shadow-md border border-gray-300">
          <h2 class="text-sm text-gray-500 mb-4">Recent Sales</h2>
          <ul class="space-y-4">
            <li class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="../assets/img/vortex.png" alt="Avatar" class="w-10 h-10 rounded-full">
                <div>
                  <p class="text-sm font-bold text-gray-900">Olivia Martin</p>
                  <p class="text-xs text-gray-500">olivia.martin@email.com</p>
                </div>
              </div>
              <p class="text-sm font-bold text-gray-900">+$1,999.00</p>
            </li>
            <!-- Répétez pour d'autres entrées -->
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>


import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    onMounted(() => {
      const ctx = document.getElementById("overview-chart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue",
              data: [2000, 4000, 3000, 5000, 4000, 6000],
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(255, 255, 255, 0.2)" } },
          },
        },
      });
    });
  },
};
