<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { useScreenWidth } from '@/@util/useScreenWidth';
import { useRandomizeIndex } from '@/@util/userRandomizeIndex';

const router = useRouter();
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);
const recipe = ref('');
const price = ref('');
const listPlaceholder = ref(["Garlic Soup", "Potage", "Ramen Noodle"]);
const randomIndex = ref(useRandomizeIndex(listPlaceholder.value));

// Generate a random placeholder dynamically every 2 seconds
onMounted(() => {
    setInterval(() => {
        randomIndex.value = useRandomizeIndex(listPlaceholder.value);
    }, 2000);
});

const placeholder = computed(() => listPlaceholder.value[randomIndex.value]);

function handleSubmit() {
    router.push('/insertDisheDetail');
}
</script>

<template>
    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />
        <div class="pt-32">
            <main class="flex flex-col items-center justify-center rounded-lg">
                <h1 class="font-montserrat font-extrabold text-4xl uppercase mb-8">create your own!</h1>
                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 box-shadow-">
                    <div class="flex flex-col space-y-8">
                            <my-input 
                                type="text" 
                                label="Your recipe's name" 
                                :placeholder="placeholder" 
                                id="recipe"
                                v-model="recipe" 
                            />
                        <my-full-button @click="handleSubmit" label="Create" />
                    </div>
                </article>
            </main>
            <my-footer />
        </div>
    </body>
</template>
