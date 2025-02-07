<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import MyBillCard from '@/components/MyBillCard.vue';
import { ref, watchEffect, computed } from 'vue';
import 'primeicons/primeicons.css'
import MyFullButton from '@/components/MyFullButton.vue';

// Function to track screen width
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);


// Mock orders (Replace with real data)
const orders = ref([
  { id: 1, date: "2024-02-06", mail: "user@example.com", dishes: [{ name: "Burger", unit: 2, price: 5000 }] },
  { id: 2, date: "2024-02-07", mail: "customer@test.com", dishes: [{ name: "Pizza", unit: 1, price: 8000 }, { name: "Burger", unit: 2, price: 5000 }] },
  { id: 3, date: "2024-02-02", mail: "john@example.com", dishes: [{ name: "Pasta", unit: 3, price: 6000 }] }
]);

// Sorting state (default: "latest")
const sortByLatest = ref(true);

// ✅ Computed property to sort orders dynamically
const sortedOrders = computed(() => {
  return [...orders.value].sort((a, b) => {
    return sortByLatest.value
      ? new Date(b.date).getTime() - new Date(a.date).getTime()  // Sort by latest first
      : new Date(a.date).getTime() - new Date(b.date).getTime(); // Sort by eldest first
  });
});

// ✅ Toggle sorting order
function toggleSorting() {
  sortByLatest.value = !sortByLatest.value;
}
</script>

<template>

  <body class="bg-(--my-pure-white)">
    <!-- Navigation -->
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />

    <main>
      <article
        class="flex flex-col space-y-8 font-nacelle text-(--my-black) mt-16 mx-8 md:mx-32 p-8 md:p-16 rounded-2xl">
        <h1 class="font-montserrat font-extrabold text-4xl uppercase">All Orders</h1>

        <!-- Sorting Button -->
        <section class="bg-(--my-white) rounded-xl w-128 px-4 py-2 shadow-xl flex flex-row space-between">
          <span class="w-2/12 mt-2">
            <i class="pi pi-sliders-v"></i>
          </span>
          <span class="w-2/12 mr-4">Filter by</span>
          <MyFullButton class="w-6/12" @click="toggleSorting" :label="sortByLatest ? 'Latest' : 'Eldest'" />
        </section>

        <!-- Render orders dynamically -->
        <section v-if="sortedOrders.length" class="space-y-6">
          <my-bill-card v-for="order in sortedOrders" :key="order.id" :order="order" />
        </section>
        <p v-else class="text-gray-500 text-lg">No orders available.</p>
      </article>
    </main>
    <my-footer />
  </body>
</template>
