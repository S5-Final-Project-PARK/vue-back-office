<script setup lang="ts">
import MyFullButton from '@/components/MyFullButton.vue';
import useFormatNumber from '@/@util/useFormatNumber';
import gsap from 'gsap';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import MyDeleteWindow from './MyDeleteWindow.vue';
import MyDeleteButton from './MyDeleteButton.vue';

const router = useRouter();

const props = defineProps<{
    id: number;
    label: string;
    price: number;
    recipeIngredients: {
        id: number;
        ingredients: { id: number; name: string; Quantity: number; };
        quantity: number; // ✅ Include quantity for clarity
    }[];
}>();

const isDeleteWindowOpen = ref(false);
const formattedPrice = computed(() => useFormatNumber(props.price));

function goToEdit() {
    const encodedLabel = encodeURIComponent(props.label);
    router.push(`/edit?info=${props.id}-${encodedLabel}-${props.price}`);
}

function openDelete() {
    isDeleteWindowOpen.value = true;
}

function closeDelete() {
    isDeleteWindowOpen.value = false;
}

function confirmDelete() {
    console.log(`Dish ${props.label} deleted`);
    closeDelete();
    router.go(0);
}

onMounted(() => {
    gsap.from("#div", {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "out",
    });
});

const isOutOfStock = computed(() => {
    return props.recipeIngredients.some(ri => {
        // Assuming 'ri.ingredients.Quantity' represents the available stock
        return ri.ingredients.Quantity < ri.quantity;
    });
});

</script>

<template>
    <!-- Reusable Delete Modal -->
    <my-delete-window :isOpen="isDeleteWindowOpen" :dishName="label" :dishId="id" @close="closeDelete"
        @confirm="confirmDelete" />

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
            <span v-if="isOutOfStock" class="text-red-600 font-extralight">Ingredients are out of stock</span>
            <span v-else class="text-green-600 font-extralight">Ingredients are in stock</span>
        </section>
        <section class="flex flex-col space-y-2 justify-between">
            <section class="flex-6 p-4 rounded-md w-64 border-2 border-(--my-black)">
                <h2 class="font-bold text-(--my-secondary) text-2xl">Ingredients</h2>
                <ul class="flex flex-wrap">
                    <li v-for="item in recipeIngredients" :key="item.id">
                        {{ item.quantity }} {{ item.ingredients.name }}
                    </li>
                </ul>
            </section>
            <my-full-button label="Edit" @click="goToEdit" />
            <my-delete-button label="Delete" @click="openDelete" />
        </section>
    </section>
</template>
