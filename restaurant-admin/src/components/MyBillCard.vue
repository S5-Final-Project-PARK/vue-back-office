<script setup lang="ts">
import MyBillTableHeader from "./MyBillTableHeader.vue";
import useFormatNumber from "@/@util/useFormatNumber";

// Props
const props = defineProps<{
        id: number;
        date: string;
        email: string;
        name: string;
        unit: number;
        price: number;
}>();
</script>

<template>
    <section class="flex flex-col space-y-4 pt-8 pb-16 px-4 w-[500px] shadow-2xs bg-(--my-white) rounded-md">
        <!-- Header -->
        <header class="flex flex-row justify-between text-3xl font-semibold font-montserrat">
            <h1 class="text-(--my-primary)">Order #{{ id }}</h1>
            <p class="text-(--my-black) uppercase">{{ date }}</p>
        </header>

        <!-- Customer Email -->
        <section class="flex flex-row space-x-2">
            <p>For:</p>
            <p class="font-bold text-(--my-secondary)">{{ email }}</p>
        </section>

        <!-- Order Item -->
        <section class="flex flex-col space-y-2">
            <!-- Table Header -->
            <my-bill-table-header/>
            <!-- Single Dish -->
            <section class="flex flex-row justify-between text-gray-900 border-b-2 pb-2">
                <span class="font-semibold w-7/12">{{ name }}</span>
                <span class="w-2/12 text-center">{{ unit }}</span>
                <span class="w-3/12 text-end">Ar {{ useFormatNumber(unit * price) }}</span>
            </section>
        </section>
    </section>
</template>
