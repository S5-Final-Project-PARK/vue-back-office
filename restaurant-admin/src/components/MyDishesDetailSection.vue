<script setup lang="ts">
import MyFullButton from '@/components/MyFullButton.vue';
import useFormatNumber from '@/@util/useFormatNumber';
import gsap from 'gsap';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    id: number;
    label: string;
    price: number;
    ingredients: { unit: number; name: string }[]; // Array of ingredients
}>();

// ✅ Use computed property to format price
const formattedPrice = computed(() => useFormatNumber(props.price));

function goToEdit() {
    const encodedLabel = encodeURIComponent(props.label); // ✅ Encode label
    router.push(`/edit?info=${props.id}-${encodedLabel}-${props.price}`);
}


onMounted(() => {
    gsap.from("#div", {
        opacity: 0,
        x: 50, // Move from right to left
        duration: 1, // Animation duration per card
        ease: "out", // Smooth easing
    });
});
</script>

<template>
    <section id="div" class="flex flex-row space-x-8">
        <img class="rounded-2xl w-64 shadow-2xl" src="../assets/img/food.jpg" alt="Food Image">
        <section class="flex flex-col space-y-8">
            <h1 class="font-bold text-4xl text-(--my-primary)">{{ label }}</h1>
            <section class="flex justify-start">
                <section class="flex flex-col space-y-2">
                    <h2 class="font-extralight">Price</h2>
                    <p class="font-montserrat font-extrabold text-8xl text-(--my-secondary)">
                        {{ formattedPrice }} <span class="text-6xl">Ar</span>
                    </p>
                </section>
            </section>
            <span class="text-green-600 font-extralight">Ingredients are in stock</span>
        </section>
        <section class="flex flex-col space-y-2 justify-between">
            <section class="flex-6 p-4 rounded-md w-64 border-2 border-(--my-black)">
                <h2 class="font-bold text-(--my-secondary) text-2xl">Ingredients</h2>
                <ul class="flex flex-wrap">
                    <li v-for="ingredient in ingredients" :key="ingredient.name">
                        {{ ingredient.unit }} {{ ingredient.name }},
                    </li>
                </ul>
            </section>
            <my-full-button label="Edit" @click="goToEdit" />
            <my-full-button label="Delete" @click="goToEdit" />
        </section>
    </section>
</template>
