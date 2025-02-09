<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { useRandomizeIndex } from '@/@util/userRandomizeIndex';
import { insertDishes } from '@/@util/useConnectData';
import gsap from "gsap";

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);

// Recipe name and price
const recipe = ref('');
const price = ref('');
const isSubmitting = ref(false);
const insertCheck = ref(true);
const errorText = ref('');

// Randomized placeholder logic
const listPlaceholder = ref(["Garlic Soup", "Potage", "Ramen Noodle"]);
const randomIndex = ref(useRandomizeIndex(listPlaceholder.value));

onMounted(() => {
    setInterval(() => {
        randomIndex.value = useRandomizeIndex(listPlaceholder.value);
    }, 2000);
});

const placeholder = computed(() => listPlaceholder.value[randomIndex.value]);

function errorToggle() {
    gsap.from("#error", {
        duration: 0.2,
        ease: "bounce",
        x: 50
    });
}

async function handleSubmit() {
    isSubmitting.value = true;
    insertCheck.value = true; // Reset error state

    // Form validation
    if (!recipe.value || !price.value) {
        insertCheck.value = false;
        errorText.value = "Please fill in both fields";
        errorToggle();
        isSubmitting.value = false;
        return;
    }

    const parsedPrice = Number(price.value);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        insertCheck.value = false;
        errorText.value = "Price must be a positive number";
        errorToggle();
        isSubmitting.value = false;
        return;
    }

    try {
        await insertDishes(recipe.value, parsedPrice);
        localStorage.setItem("newDisheName",recipe.value);
        
        router.push('/details'); // ✅ Redirect only after successful API call
    } catch (error) {
        insertCheck.value = false;
        errorText.value = "Failed to insert dish. Please try again.";
        errorToggle();
        console.error("Error inserting dish:", error);
    }

    isSubmitting.value = false;
}
</script>

<template>
    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />

        <div class="pt-32">
            <main class="flex flex-col items-center justify-center rounded-lg">
                <h1 class="font-montserrat font-extrabold text-4xl uppercase mb-8">Create your own!</h1>

                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 shadow-md">
                    <div class="flex flex-col space-y-8">
                        <my-input 
                            type="text" 
                            label="Your recipe's name" 
                            :placeholder="placeholder" 
                            id="recipe"
                            v-model="recipe" 
                        />
                        <my-input
                            type="number"
                            label="Your price"
                            placeholder="000 Ar"
                            id="price"
                            v-model="price"
                        />
                        <p>NB: Once you enter these info you won't be able to remove it in this process</p>
                        <p v-if="!insertCheck" id="error" class="text-red-800 text-sm">
                            ❌ {{ errorText }}
                        </p>
                        <my-full-button v-if="!isSubmitting" @click="handleSubmit" label="Next" />
                        <my-full-button v-else label="INSERTING..." />
                    </div>
                </article>
            </main>
            <my-footer />
        </div>
    </body>
</template>
