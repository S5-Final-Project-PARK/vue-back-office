<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import MyBillCard from '@/components/MyBillCard.vue';
import gsap from "gsap";
import { ref, computed, onMounted } from 'vue';
import 'primeicons/primeicons.css'
import MyFullButton from '@/components/MyFullButton.vue';
import { getOrders } from '@/@util/useConnectData';
import type { Order } from '@/@util/interace/Orders';

// Function to track screen width
const screenWidth = useScreenWidth();
const isScreenLarge = ref(true);

// Mock orders (Replace with real data)
/*const orders = ref([
  { id: 1, date: "2024-02-06", mail: "user@example.com", name: "Burger", unit: 2, price: 5000 },
  { id: 2, date: "2024-01-15", mail: "customer@test.com", name: "Pizza", unit: 1, price: 8000 },
  { id: 3, date: "2023-12-10", mail: "john@example.com", name: "Pasta", unit: 3, price: 6000 }
]);*/

const fetchedOrders = ref<Order[]>([]);

// Sorting state (default: "latest")
const sortByLatest = ref(true);
const selectedMonth = ref(""); // Stores the selected month for filtering

// Get unique months from orders
const availableMonths = computed(() => {
  const months = fetchedOrders.value.map(order => order.Date.substring(0, 7)); // Extract YYYY-MM
  return [...new Set(months)]; // Remove duplicates
});

// ✅ Computed property to filter and sort orders dynamically
const filteredSortedOrders = computed(() => {
  let filteredOrders = [...fetchedOrders.value];

  // Apply month filter if a month is selected
  if (selectedMonth.value) {
    filteredOrders = filteredOrders.filter(order => order.Date.startsWith(selectedMonth.value));
  }

  // Apply sorting
  return filteredOrders.sort((a, b) => {
    return sortByLatest.value
      ? new Date(b.Date).getTime() - new Date(a.Date).getTime()  // Sort by latest first
      : new Date(a.Date).getTime() - new Date(b.Date).getTime(); // Sort by eldest first
  });
});

// ✅ Toggle sorting order
function toggleSorting() {
  sortByLatest.value = !sortByLatest.value;
}

// GSAP Animations
onMounted(async () => {
  gsap.from("#title", { duration: 0.8, x: 100, ease: "out", opacity: 0 });
  gsap.from("#filter", { duration: 0.8, x: 100, ease: "out", opacity: 0, delay: 0.5 });
  gsap.from("#list", { duration: 0.8, x: 100, ease: "out", opacity: 0, delay: 1 });
  try {
    const orders = await getOrders();
    fetchedOrders.value = orders;

    console.log(fetchedOrders);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
});

</script>

<template>

  <body class="bg-(--my-pure-white)">
    <!-- Navigation -->
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />

    <main>
      <article
        class="flex flex-col space-y-8 font-nacelle text-(--my-black) mt-16 mx-8 md:mx-32 p-8 md:p-16 rounded-2xl">
        <h1 id="title" class="font-montserrat font-extrabold text-4xl uppercase">All Orders</h1>

        <!-- Filter & Sorting Section -->
        <section id="filter"
          class="bg-(--my-white) rounded-xl w-128 px-4 py-2 shadow-xl flex flex-row items-center space-x-4">
          <span class="text-xl"><i class="pi pi-sliders-v"></i></span>
          <span>Filter by</span>

          <!-- Month Filter Dropdown -->
          <select v-model="selectedMonth"
            class="w-full bg-(--my-primary) text-(--my-white) py-2 px-4 rounded-lg hover:bg-(--my-primary-darker) transition duration-300">
            <option value="">All Months</option>
            <option v-for="month in availableMonths" :key="month" :value="month">
              {{ month }}
            </option>
          </select>

          <!-- Sorting Button -->
          <MyFullButton class="w-6/12" @click="toggleSorting" :label="sortByLatest ? 'Latest' : 'Eldest'" />
        </section>

        <!-- Render orders dynamically -->
        <article id="list">
          <section v-if="filteredSortedOrders.length" class="space-y-6">
            <my-bill-card 
              v-for="order in fetchedOrders" 
              :key="order.id" 
              :id="order.id" 
              :date="order.Date"
              :email="order.email"
              :name="order.Dish.name"
              :unit="order.unit"
              :price="order.unit_price" />
          </section>
          <p v-else class="text-gray-500 text-lg">loading orders ...</p>
        </article>
      </article>
    </main>
    <my-footer />
  </body>
</template>
