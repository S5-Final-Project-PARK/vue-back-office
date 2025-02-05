<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyHomeHeader from '@/components/MyHomeHeader.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { onMounted, ref } from 'vue';
import 'primeicons/primeicons.css';
import MyDishesCard from '@/components/MyDishesCard.vue';
import gsap from 'gsap';

// Function to track screen width
const screenWidth = useScreenWidth();
const defaultScreenWidth = ref(screenWidth.value);
const isScreenLarge = ref(true);

onMounted(() => {
  gsap.from("#list", {
    opacity: 0,
    y: -50, // Move up from 50px
    duration: 0.6, // Animation duration per card
    ease: "out", // Smooth easing
  });
});
</script>

<template>
  <body class="bg-[--my-pure-white]">
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />
    <main>
      <article
        class="flex flex-col space-y-8 font-nacelle text-(--my-black) mt-16 mx-32 p-16 rounded-2xl bg-(--my-white)">
        <h1 id="title" class=" font-montserrat font-extrabold text-4xl uppercase">All your dishes</h1>
        <section id="list" class="grid grid-cols-4 grid-rows-3 gap-2">
          <my-dishes-card label="Dish 1" />
          <my-dishes-card label="Dish 2" />
          <my-dishes-card label="Dish 3" />
          <my-dishes-card label="Dish 4" />
        </section>
      </article>
    </main>
    <my-footer />
  </body>
</template>
