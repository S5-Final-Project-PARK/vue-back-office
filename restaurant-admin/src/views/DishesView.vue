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
import { getRecipes } from '@/@util/useConnectData';
import type { Recipe } from '@/@util/interace/Recipe';

// Function to track screen width
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const isDetailsSectionOpen = ref(false);

// Selected recipe details
const dishDetails = ref<Recipe | null>(null);

const recipes = ref<Recipe[]>([]);

onMounted(async () => {
  gsap.from("#list", {
    opacity: 0,
    y: -50,
    duration: 0.6,
    ease: "power2.out",
  });

  try {
    const data = await getRecipes();
    // ✅ Ensure data is always an array and transform it correctly
    recipes.value = data.map((recipe: any) => ({
      id: recipe.id,
      Dish: recipe.Dish, // Convert "Dish" (API) to "Dish" (TypeScript)
      recipeIngredients: recipe.recipeIngredients.map((ri: any) => ({
        id: ri.id,
        ingredients: ri.ingredients, // Convert "ingredients" (API) to "ingredient" (TypeScript)
        quantity: ri.quantity
      }))
    }));

    console.log("Processed Dishes:", recipes.value);
    console.log("Processed Dishes:", JSON.stringify(recipes.value, null, 2));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipes.value = [];
  }
});

// Function to show recipe details
function showDetails(recipe: Recipe) {
  dishDetails.value = recipe;
  isDetailsSectionOpen.value = true;
}

// Function to close details
function closeDetails() {
  isDetailsSectionOpen.value = false;
  dishDetails.value = null;
  gsap.from("#list", {
    y: -50,
    duration: 0.4,
    ease: "bounce",
  });
}
</script>

<template>

  <body class="bg-(--my-pure-white)">
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />
    <main>
      <article
        class="flex flex-col space-y-8 font-nacelle text-(--my-black) mt-16 mx-32 p-16 rounded-2xl bg-(--my-white)">
        <h1 class="font-montserrat font-extrabold text-4xl uppercase">All your recipe</h1>
        <router-link to="/Cook"
          class="flex flex-row space-x-2 px-8 py-4 w-64 bg-none rounded-full border-2 font-nacelle border-(--my-black) hover:bg-(--my-black) hover:text-(--my-white) duration-300 hover:translate-y-1">
          <i class="pi pi-plus"></i>
          <p>Add a new recipe</p>
        </router-link>

        <!-- Details Section -->
        <section v-if="isDetailsSectionOpen" class="flex flex-row space-x-4">
          <my-dishes-detail-section v-if="dishDetails" :label="dishDetails.Dish.name" :price="dishDetails.Dish.price"
            :id="dishDetails.id" :ingredients="dishDetails.recipeIngredients.map(ri => ({
              unit: ri.ingredients.Quantity, // Fix here 
              name: ri.ingredients.name
            }))" />
          <section>
            <span @click="closeDetails"
              class="font-extralight flex flex-row space-x-2 hover:border-b-2 hover:border-red-600 hover:text-red-600 duration-100">
              <p>Close</p>
              <i class="pi pi-times"></i>
            </span>
          </section>
        </section>

        <!-- Dish List -->
        <section id="list" class="grid grid-cols-4 grid-rows-2 gap-2">
          <my-dishes-card 
            v-for="recipe in recipes" 
            :key="recipe.id" 
            :label="recipe.Dish.name" 
            :recipeIngredients="dishDetails?.recipeIngredients?.map(ri => ({
            id: ri.id,
            ingredients: ri.ingredients,
            quantity: ri.ingredients.Quantity
          })) || []" @click="showDetails(recipe)" />
        </section>

        <!-- No Dishes Message -->
        <p v-if="!recipes.length" class="text-center text-gray-500">No dishes available.</p>

      </article>
    </main>
    <my-footer />
  </body>
</template>
