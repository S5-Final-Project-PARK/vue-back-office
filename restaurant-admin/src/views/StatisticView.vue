<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import MyStatisticSection from '@/components/MyStatisticSection.vue';
import { ref, computed } from 'vue';

// Function to track screen width
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);

// ✅ Dynamic dataset (loopable)
const statistics = ref([
    { month: 'Dishes 1', unit: 100, color: '#ff6384' },
    { month: 'Dishes 2', unit: 200, color: '#36a2eb' },
    { month: 'Dieshes 3', unit: 300, color: '#ffce56' },
    { month: 'Dishes 1', unit: 120, color: '#ff6384' },
    { month: 'Dishes 2', unit: 600, color: '#36a2eb' },
    { month: 'Dieshes 3', unit: 400, color: '#ffce56' },
]);

// ✅ Compute chart data dynamically
const chartData = computed(() => ({
    labels: statistics.value.map((stat) => stat.month),
    datasets: [
        {
            label: 'Unit',
            data: statistics.value.map((stat) => stat.unit),
            backgroundColor: statistics.value.map((stat) => stat.color),
        },
    ],
}));
</script>

<template>
    <body class="bg-(--my-pure-white)">
        <my-navigation v-if="isScreenLarge" />
        <my-navigation-short v-else />
        <main>
            <article class="flex flex-col space-y-8 font-nacelle text-(--my-black) mt-16 mx-32 p-16 rounded-2xl bg-(--my-white) mb-48">
                <h1 class="font-montserrat font-extrabold text-4xl uppercase">
                    Stats
                </h1>
                <my-statistic-section :chartData="chartData" />
            </article>
        </main>
        <my-footer />
    </body>
</template>
