<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);

// Available ingredients
const ingredients = ref(["Carrot", "Lettuce", "Noodle", "Tomato", "Cabbage", "Soup"]);
const selectedIngredient = ref('');
const numberRestock = ref('');
const insertCheck = ref(true);

function handleSubmit() {
    if (!selectedIngredient.value || !numberRestock.value) return;
    if (parseInt(numberRestock.value) > 0) {
        router.push('/ingredient');
    }else{
        insertCheck.value = false;
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
                                <option v-for="ingredient in ingredients" :key="ingredient" :value="ingredient">
                                    {{ ingredient }}
                                </option>
                            </select>
                        </div>
                        <my-input type="number" label="restock" placeholder="..." id="restock"
                            v-model="numberRestock" />
                        <p v-if="!insertCheck" class="text-red-800 text-sm">
                            ❌ Number cannot be negative
                        </p>
                        <!-- Submit Button -->
                        <my-full-button @click="handleSubmit" label="RESTOCK" />
                    </div>
                </article>
            </main>

            <my-footer />
        </div>
    </body>
</template>
