<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      
<h1 class="naslov">Pizze</h1>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-for="pizza in pizze" :key="pizza.id" :href="pizza.href" class="group">
          <img :src="pizza.slika" :alt="pizza.imageAlt" class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]" />
          <h3 class="mt-4 text-sm text-gray-700">{{ pizza.naziv }}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ pizza.cijena }}</p>
          <li v-for="sastojak in pizza.sastojci" :key="sastojak"> {{ sastojak }}</li>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

let pizze = ref([]);

async function prikaziPizze() {
  try {
    const response = await axios.get('http://localhost:3000/pizze');
    pizze.value = response.data;
  } catch (error) {
    console.error("Greška u dohvatu podataka", error);
  }
}

onMounted(() => {
  prikaziPizze();
});
</script>


<style>
.naslov {
  text-align: center;
  font-size: 5rem;
  margin-bottom: 3rem;
}
</style>