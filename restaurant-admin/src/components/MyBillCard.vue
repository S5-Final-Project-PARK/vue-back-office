<script setup lang="ts">
import { computed } from "vue";
import MyBillTableHeader from "./MyBillTableHeader.vue";
import useFormatNumber from "@/@util/useFormatNumber";

// Props
const props = defineProps<{
    order: {
        id: number;
        date: string;
        mail: string;
        dishes: {
            name: string;
            unit: number;
            price: number;
        }[];
    };
}>();

// Compute total price
const totalPrice = computed(() => {
    return props.order.dishes.reduce((sum, dish) => sum + dish.unit * dish.price, 0);
});
</script>

<template>
    <section class="flex flex-col space-y-4 pt-8 pb-16 px-4 w-[500px] shadow-2xs bg-(--my-white) rounded-md">
        <!-- Header -->
        <header class="flex flex-row justify-between text-3xl font-semibold font-montserrat">
            <h1 class="text-(--my-primary)">Order #{{ order.id }}</h1>
            <p class="text-(--my-black) uppercase">{{ order.date }}</p>
        </header>

        <!-- Customer Email -->
        <section class="flex flex-row space-x-2">
            <p>For:</p>
            <p class="font-bold text-(--my-secondary)">{{ order.mail }}</p>
        </section>

        <!-- Order Items -->
        <section class="flex flex-col space-y-2">
            <!-- Table Header -->
            <my-bill-table-header/>
            <!-- Order List -->
            <section v-for="dish in order.dishes" :key="dish.name" class="flex flex-row justify-between text-gray-900 border-b-2 pb-2">
                <span class="font-semibold w-7/12">{{ dish.name }}</span>
                <span class="w-2/12 text-center">{{ dish.unit }}</span>
                <span class="w-3/12 text-end">Ar {{ useFormatNumber(dish.unit * dish.price) }}</span>
            </section>
        </section>

        <!-- Total Price -->
        <section class="flex flex-row justify-end space-x-2 pt-4">
            <span>Total Price:</span>
            <span class="font-bold">Ar {{ useFormatNumber(totalPrice) }}</span>
        </section>
    </section>
</template>
