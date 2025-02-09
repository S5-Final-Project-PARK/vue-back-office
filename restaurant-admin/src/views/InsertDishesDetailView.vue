<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { getIngredients} from '@/@util/useConnectData';
import MyIngredientRadio from '@/components/MyIngredientRadio.vue';

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const hasLoaded = ref(false);

const ingredients = ref<{ name: string; id: number }[]>([]);

// Store selected ingredients in a reactive object
const selectedIngredients = reactive(new Set<string>());

// Store ingredient quantities (only for selected ones)
const ingredientQuantities = reactive<Record<string, number>>({});


// Function to toggle ingredient selection
function toggleSelection(ingredient: string) {
    if (selectedIngredients.has(ingredient)) {
        selectedIngredients.delete(ingredient);
        delete ingredientQuantities[ingredient]; // Remove from quantities
    } else {
        selectedIngredients.add(ingredient);
        ingredientQuantities[ingredient] = 0; // Initialize quantity
    }
}

// Function to increase quantity
function increaseQuantity(ingredient: string) {
    if (selectedIngredients.has(ingredient)) {
        ingredientQuantities[ingredient]++;
    }
}
// Function to increase quantity
function decreaseQuantity(ingredient: string) {
    if (selectedIngredients.has(ingredient)) {
        if (ingredientQuantities[ingredient] > 0) {
            ingredientQuantities[ingredient]--;
        }
    }
}

onMounted(async () => {
    ingredients.value = await getIngredients();
    hasLoaded.value = true;
});
// Function to handle form submission
function handleSubmit() {
    console.log("Selected Ingredients & Quantities:", ingredientQuantities);
    router.push('/dishes');
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
                                    @click="toggleSelection(ingredient.name)" />

                                <!-- Display quantity only if selected -->
                                <p v-if="selectedIngredients.has(ingredient.name)"
                                    class=" flex-2 px-4 bg-(--my-primary) text-(--my-white) rounded-2xl pt-1 text-2xl font-montserrat font-bold">
                                    {{ ingredientQuantities[ingredient.name] }}
                                </p>

                                <!-- Plus button (disabled if not selected) -->
                                <button @click="increaseQuantity(ingredient.name)"
                                    :disabled="!selectedIngredients.has(ingredient.name)"
                                    class="flex-2 px-4 bg-(--my-white) text-(--my-primary) rounded-2xl border-2 border-(--my-primary) pt-1 text-2xl font-montserrat font-bold duration-300"
                                    :class="{ 'opacity-50 cursor-not-allowed': !selectedIngredients.has(ingredient.name), 'hover:bg-(--my-primary) hover:text-(--my-white)': selectedIngredients.has(ingredient.name) }">
                                    <i class="pi pi-plus"></i>
                                </button>
                                <button @click="decreaseQuantity(ingredient.name)"
                                    :disabled="!selectedIngredients.has(ingredient.name)"
                                    class="flex-2 px-4 bg-(--my-white) text-(--my-primary) rounded-2xl border-2 border-(--my-primary) pt-1 text-2xl font-montserrat font-bold duration-300"
                                    :class="{ 'opacity-50 cursor-not-allowed': !selectedIngredients.has(ingredient.name), 'hover:bg-(--my-primary) hover:text-(--my-white)': selectedIngredients.has(ingredient.name) }">
                                    <i class="pi pi-minus"></i>
                                </button>
                            </section>
                        </section>
                        <section v-else class="flex flex-col items-center justify-center">
                        <div class=" text-6xl mt-16">
                            <i class="pi pi-spin pi-spinner"></i>
                        </div>
                        <p class=" animate-pulse">Loading Ingredient...</p>
                    </section>
                        <my-full-button @click="handleSubmit" label="Create" />
                    </div>
                </article>
            </main>
            <my-footer />
        </div>
    </body>
</template>
