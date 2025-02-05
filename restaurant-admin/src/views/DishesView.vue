<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { onMounted, ref } from 'vue';
import 'primeicons/primeicons.css';
import MyDishesCard from '@/components/MyDishesCard.vue';
import gsap from 'gsap';
import MyDishesDetailSection from '@/components/MyDishesDetailSection.vue';

// Function to track screen width
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const checkDetails = ref(false);

const dishDetails = ref({
  id: 0,
  name: "lorem ipsum",
  stock: 25,
  price: 10000,
  ingredients: [{ unit: 0, name: "" }]
});

// Sample dishes with dynamic ingredients
const dishes = ref([
  { id: 1, name: "Dish 1", stock: 10, price: 15000, ingredients: [{ unit: 1, name: "Tomato" }, { unit: 2, name: "Cheese" }] },
  { id: 2, name: "Dish 2", stock: 8, price: 12000, ingredients: [{ unit: 3, name: "Basil" }, { unit: 1, name: "Olive Oil" }] },
  { id: 3, name: "Dish 3", stock: 5, price: 18000, ingredients: [{ unit: 1, name: "Chicken" }, { unit: 2, name: "Garlic" }] },
  { id: 4, name: "Dish 4", stock: 12, price: 10000, ingredients: [{ unit: 2, name: "Pepper" }, { unit: 1, name: "Salt" }] },
]);

onMounted(() => {
  gsap.from("#list", {
    opacity: 0,
    y: -50,
    duration: 0.6,
    ease: "power2.out",
  });
});

// Function to show dish details
function showDetails(dish: any) {
  dishDetails.value = { ...dish }; // Update dish details dynamically
  checkDetails.value = true;
}

// Function to close details
function closeDetails() {
  checkDetails.value = false;
  gsap.from("#list", {
    y: -50,
    duration: 0.4,
    ease: "bounce",
  });
}
</script>

<template>
  <body class="bg-[--my-pure-white]">
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />
    <main>
      <article class="flex flex-col space-y-8 font-nacelle text-[--my-black] mt-16 mx-32 p-16 rounded-2xl bg-[--my-white]">
        <h1 class="font-montserrat font-extrabold text-4xl uppercase">All your dishes</h1>

        <!-- Details Section -->
        <section v-if="checkDetails" class="flex flex-row space-x-4">
          <my-dishes-detail-section :label="dishDetails.name" :price="dishDetails.price" :stock="dishDetails.stock" :id="dishDetails.id" :ingredients="dishDetails.ingredients" />
          <section>
            <span @click="closeDetails" class="font-extralight flex flex-row space-x-2 hover:border-b-2 hover:border-red-600 hover:text-red-600 duration-100">
              <p>Close</p>
              <i class="pi pi-times"></i>
            </span>
          </section>
        </section>

        <!-- Dish List -->
        <section id="list" class="grid grid-cols-4 grid-rows-2 gap-2">
          <my-dishes-card 
            v-for="(dish, index) in dishes" 
            :key="index" 
            :label="dish.name" 
            :ingredients="dish.ingredients" 
            @click="showDetails(dish)"
          />
        </section>
      </article>
    </main>
    <my-footer />
  </body>
</template>
