<script setup lang="ts">
import MyFullButton from '@/components/MyFullButton.vue';
import useFormatNumber from '@/@util/useFormatNumber';
import gsap from 'gsap';
import { onMounted } from 'vue';

defineProps<{
    id:number;
    label:string;
    stock:number;
    price:number;
    ingredients: { unit: number; name: string }[]; // Array of ingredients
}>()


onMounted(() => {
    gsap.from("#div", {
        opacity: 0,
        x: 50, // Move up from 50px
        duration: 1, // Animation duration per card
        ease: "out", // Smooth easing
    });
});
</script>
<template>
    <section id="div" class="flex flex-row space-x-8">
        <img class="rounded-2xl w-64 shadow-2xl" src="../assets/img/food.jpg" alt="" srcset="">
        <section>
            <h1 class="font-bold text-4xl text-(--my-primary)">{{ label }}</h1>
            <section class="flex justify-start">
                <section class="flex flex-col space-y-2">
                    <h2 class="font-extralight">price</h2>
                    <p class="font-montserrat font-extrabold text-8xl text-(--my-secondary)">{{ useFormatNumber(price) }}
                        <span class="text-6xl">Ar</span>
                    </p>
                </section>
            </section>
        </section>
        <section class="flex flex-col space-y-2 justify-between">
            <section class="flex-6 p-4 rounded-md w-64 border-2 border-(--my-black)">
                <h2 class="font-bold text-(--my-secondary) text-2xl">Ingredients</h2>
                <ul>
                    <li v-for="ingredient in ingredients" :key="ingredient.name" >{{ ingredient.unit }} {{ ingredient.name }}</li>
                </ul>
            </section>
            <my-full-button label="Edit" />
        </section>
    </section>
</template>