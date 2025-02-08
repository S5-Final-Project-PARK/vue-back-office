<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { getIngredients, restockIngredientStock } from '@/@util/useConnectData';
import gsap from "gsap";

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);

// Available ingredients
const ingredients = ref<{ name: string; id: number }[]>([]);
const selectedIngredient = ref('');
const numberRestock = ref('');
const insertCheck = ref(true);
const errorText = ref('');
const isSubmitting = ref(false);

function errorToggle() {
    gsap.from("#error", {
        duration: 0.2,
        ease: "bounce",
        x: 50
    });
}

onMounted(async () => {
    ingredients.value = await getIngredients();
});

async function handleSubmit() {
    isSubmitting.value = true;
    insertCheck.value = true; // Reset error state

    if (!selectedIngredient.value || !numberRestock.value) {
        insertCheck.value = false;
        errorText.value = "Please fill the forms";
        errorToggle();
        return;
    }

    const restockAmount = Number(numberRestock.value);

    if (isNaN(restockAmount) || restockAmount <= 0) {
        insertCheck.value = false;
        errorText.value = "Number must be a positive value";
        errorToggle();
        return;
    }

    try {
        await restockIngredientStock(selectedIngredient.value, restockAmount); // ✅ Wait for API call
        router.push('/ingredient'); // ✅ Only navigate after API call finishes
    } catch (error) {
        insertCheck.value = false;
        errorText.value = "Failed to update stock. Please try again.";
        errorToggle();
        console.error("Stock update error:", error);
    }
}

</script>

<template>

    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />

        <div class="pt-32">
            <main class="flex flex-col items-center justify-center rounded-lg">
                <h1 class="font-montserrat font-extrabold text-4xl uppercase mb-8">Restock your ingredient</h1>

                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 shadow-md">
                    <div class="flex flex-col space-y-8">

                        <!-- Ingredient Selection -->
                        <div>
                            <label for="ingredient" class="block text-gray-800">Select an ingredient</label>
                            <select id="ingredient" v-model="selectedIngredient"
                                class="w-full px-4 py-2 bg-gray-200 rounded-lg hover:ring-2 hover:ring-(--my-secondary) focus:outline-none focus:ring-2 focus:ring-(--my-secondary) transition duration-300">
                                <option value="" disabled>Select an ingredient</option>
                                <option v-for="ingredient in ingredients" :key="ingredient.name" :value="ingredient.id">
                                    {{ ingredient.name }}
                                </option>
                            </select>
                        </div>
                        <my-input type="number" label="restock" placeholder="..." id="restock"
                            v-model="numberRestock" />
                        <p v-if="!insertCheck" id="error" class="text-red-800 text-sm">
                            ❌ {{ errorText }}
                        </p>
                        <!-- Submit Button -->
                        <my-full-button v-if="!isSubmitting" @click="handleSubmit" label="RESTOCK" />
                        <my-full-button v-else label="INSERTING..." />

                    </div>
                </article>
            </main>

            <my-footer />
        </div>
    </body>
</template>
