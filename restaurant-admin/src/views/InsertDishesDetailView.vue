<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { getDishes, getIngredients, insertRecipe } from '@/@util/useConnectData';
import MyIngredientRadio from '@/components/MyIngredientRadio.vue';
import type { Ingredient } from '@/@util/interace/Ingredient';
import type { Dish } from '@/@util/interace/Dish';

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const hasLoaded = ref(false);

const ingredients = ref<Ingredient[]>([]);
const selectedDish = ref<Dish>();

// Store selected ingredients in a reactive object
const selectedIngredients = reactive(new Map<number, { name: string; quantity: number }>());

// Function to toggle ingredient selection
function toggleSelection(ingredient: Ingredient) {
    if (selectedIngredients.has(ingredient.id)) {
        selectedIngredients.delete(ingredient.id);
    } else {
        selectedIngredients.set(ingredient.id, { name: ingredient.name, quantity: 1 });
    }
}

// Function to increase quantity
function increaseQuantity(ingredient: Ingredient) {
    if (selectedIngredients.has(ingredient.id)) {
        selectedIngredients.get(ingredient.id)!.quantity++;
    }
}

// Function to decrease quantity
function decreaseQuantity(ingredient: Ingredient) {
    if (selectedIngredients.has(ingredient.id) && selectedIngredients.get(ingredient.id)!.quantity > 1) {
        selectedIngredients.get(ingredient.id)!.quantity--;
    }
}

onMounted(async () => {
    ingredients.value = await getIngredients();
    const dishes = await getDishes();

    const newDisheName = localStorage.getItem("newDisheName");

    if (newDisheName) { // Ensure newDisheName is not null
        for (const dish of dishes) {
            if (newDisheName === dish.name) {
                selectedDish.value = dish;
                console.log("Dish found:", selectedDish.value);
                break;
            }
        }
    } else {
        console.log("No dish name found in localStorage");
    }

    hasLoaded.value = true;
});

async function handleSubmit() {
    const finalSelection = Array.from(selectedIngredients.entries()).map(([id, { name, quantity }]) => ({
        id,
        name,
        quantity,
    }));

    const finalIngredients = ref<Ingredient[]>([]);

    // Correct the casing here:
    finalIngredients.value = finalSelection.map(item => ({
        id: item.id,
        name: item.name,
        Quantity: item.quantity, // Capital 'Q'
    }));

    try {
        await insertRecipe(selectedDish.value?.id, finalIngredients.value);
        //console.log(selectedDish.value?.id);
        console.log("Recipe created successfully!");
        router.push('/dishes'); // Redirect after success
    } catch (error) {
        console.error("Failed to create recipe:", error);
    }
}
</script>

<template>

    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />
        <div class="pt-32">
            <main class="flex flex-col items-center justify-center rounded-lg">
                <h1 class="font-montserrat font-extrabold text-4xl uppercase mb-8">What your dream is made of?</h1>
                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 shadow-2xs">
                    <div class="flex flex-col space-y-8">
                        <section class="flex flex-col space-y-2" v-if="hasLoaded">
                            <section v-for="ingredient in ingredients" :key="ingredient.id"
                                class="flex flex-row space-x-2">
                                <!-- Ingredient selection -->
                                <MyIngredientRadio class="flex-6" :label="ingredient.name"
                                    @click="toggleSelection(ingredient)" />

                                <!-- Display quantity only if selected -->
                                <p v-if="selectedIngredients.has(ingredient.id)"
                                    class="flex-2 px-4 bg-(--my-primary) text-(--my-white) rounded-2xl pt-1 text-2xl font-montserrat font-bold">
                                    {{ selectedIngredients.get(ingredient.id)?.quantity }}
                                </p>

                                <!-- Plus button (disabled if not selected) -->
                                <button @click="increaseQuantity(ingredient)"
                                    :disabled="!selectedIngredients.has(ingredient.id)"
                                    class="flex-2 px-4 bg-(--my-white) text-(--my-primary) rounded-2xl border-2 border-(--my-primary) pt-1 text-2xl font-montserrat font-bold duration-300"
                                    :class="{ 'opacity-50 cursor-not-allowed': !selectedIngredients.has(ingredient.id), 'hover:bg-(--my-primary) hover:text-(--my-white)': selectedIngredients.has(ingredient.id) }">
                                    <i class="pi pi-plus"></i>
                                </button>
                                <button @click="decreaseQuantity(ingredient)"
                                    :disabled="!selectedIngredients.has(ingredient.id)"
                                    class="flex-2 px-4 bg-(--my-white) text-(--my-primary) rounded-2xl border-2 border-(--my-primary) pt-1 text-2xl font-montserrat font-bold duration-300"
                                    :class="{ 'opacity-50 cursor-not-allowed': !selectedIngredients.has(ingredient.id), 'hover:bg-(--my-primary) hover:text-(--my-white)': selectedIngredients.has(ingredient.id) }">
                                    <i class="pi pi-minus"></i>
                                </button>
                            </section>
                        </section>
                        <section v-else class="flex flex-col items-center justify-center">
                            <div class="text-6xl mt-16">
                                <i class="pi pi-spin pi-spinner"></i>
                            </div>
                            <p class="animate-pulse">Loading Ingredients...</p>
                        </section>
                        <my-full-button @click="handleSubmit" label="Create" />
                    </div>
                </article>
            </main>
            <my-footer />
        </div>
    </body>
</template>
