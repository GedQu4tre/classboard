<template>
  <section class="py-14" id="teams">
    <div class="max-w-screen-xl mx-auto px-4 text-center md:px-8">
      <div class="max-w-xl mx-auto">
        <h3 class="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Notre équipe
        </h3>
        <p class="text-gray-600 mt-3">
          Nous avons constitué une équipe de professionnels chevronnés dédiés à la gestion scolaire et aux technologies éducatives. Leur expertise approfondie, leur dévouement et leur engagement sont les clés de la réussite de nos clients.
        </p>
      </div>
      <div class="mt-12">
        <ul class="grid gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <li v-for="(item, idx) in team" :key="idx">
            <div class="w-20 h-20 mx-auto">
              <img
                :src="getImageUrl(item.avatar)" 
                class="w-full h-full rounded-full"
                alt=""
              />
            </div>
            <div class="mt-2">
              <h4 class="text-gray-700 font-semibold sm:text-lg">
                {{ item.name }}
              </h4>
              <p class="text-indigo-600">{{ item.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          avatar: "teams1.png",
          name: "Ged Kongolo",
          title: "CEO & PDG",
        },
        {
          avatar: "teams2.png",
          name: "Ben Kazal",
          title: "Directrice Marketing",
        },
        {
          avatar: "teams3.jpg",
          name: "Maddie Nseya",
          title: "Service client",
        },
        {
          avatar: "teams4.jpg",
          name: "Justin Nawej",
          title: "Designer & graphiste",
        },
        {
          avatar: "teams5.jpg",
          name: "Patricia Kabwe",
          title: "Développeuse FullStack",
        },
      ],
    };
  },
  methods: {
    getImageUrl(imageName) {
      return new URL(`../assets/img/${imageName}`, import.meta.url).href;
    }
  }
};
</script>
