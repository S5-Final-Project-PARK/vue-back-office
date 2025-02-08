<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { getIngredient } from '@/@util/useConnectData';
import gsap from "gsap";

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const hasLoaded = ref(false);
const ingredients = ref<{ name: string; Quantity: number }[]>([]); // ✅ Store data in ref


onMounted(async () => {

    gsap.from("#title", { duration: 0.8, x: 100, ease: "out", opacity: 0 });
    ingredients.value = await getIngredient(); // ✅ Assign fetched data
    console.log(ingredients.value); // ✅ Now it will log real data
    hasLoaded.value = true;
});

</script>

<template>

    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />
        <div class="pt-32">
            <main class="mx-32 rounded-lg flex flex-col space-y-4">
                <h1 id="title" class="font-montserrat font-extrabold text-4xl uppercase mb-8">All your ingredient</h1>
                <router-link to="/restock"
                    class="flex flex-row space-x-2 px-8 py-4 w-64 bg-none rounded-full border-2 font-nacelle border-(--my-black) hover:bg-(--my-black) hover:text-(--my-white) duration-300 hover:translate-y-1">
                    <i class="pi pi-plus"></i>
                    <p>Restock</p>
                </router-link>
                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 shadow-2xl">
                    <section
                        class="flex flex-row justify-between text-gray-600 font-semibold uppercase border-b-2 pb-2">
                        <span class="w-7/12">Ingredient</span>
                        <span class="w-5/12 text-end">Qty</span>
                    </section>
                    <section :v-if="hasLoaded" v-for="ingredient in ingredients" :key="ingredient.name"
                        class="flex flex-row justify-between text-gray-900 border-b-2 pb-2">
                        <span class="font-semibold w-7/12">{{ ingredient.name }}</span>
                        <span class="w-5/12 text-end">{{ ingredient.Quantity }}</span>
                    </section>
                    <section v-if="!hasLoaded" class="flex flex-col items-center justify-center">
                        <div class=" text-6xl mt-16">
                            <i class="pi pi-spin pi-spinner"></i>
                        </div>
                        <p class=" animate-pulse">Loading Data...</p>
                    </section>
                </article>
            </main>
            <my-footer />
        </div>
    </body>
</template>
