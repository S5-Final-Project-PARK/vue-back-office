<script setup lang="ts">
import MyFullButton from '@/components/MyFullButton.vue';
import useFormatNumber from '@/@util/useFormatNumber';

defineProps<{
    label:string;
    stock:number;
    price:number;
}>()
</script>
<template>
    <section class="flex flex-row space-x-8">
        <img class="rounded-2xl w-64 shadow-2xl" src="../assets/img/food.jpg" alt="" srcset="">
        <section>
            <h1 class="font-bold text-4xl text-(--my-primary)">{{ label }}d</h1>
            <section class="flex justify-start">
                <section class="flex flex-col space-y-2">
                    <h2 class="font-extralight">out of stock</h2>
                    <p class="font-montserrat font-extrabold text-8xl text-(--my-secondary)">{{ stock }}</p>
                </section>
            </section>
            <section class="flex justify-start">
                <section class="flex flex-col space-y-2">
                    <h2 class="font-extralight">price</h2>
                    <p class="font-montserrat font-extrabold text-8xl text-(--my-secondary)">{{ useFormatNumber(price) }}
                        <span class="text-6xl">Ar</span>
                    </p>
                </section>
            </section>
        </section>
        <section class="flex flex-col space-y-2 justify-between">
            <section class="flex-6 p-4 rounded-md w-64 border-2 border-(--my-black)">
                <h2 class="font-bold text-(--my-secondary) text-2xl">Ingredients</h2>
                <ul>
                    <li>4 item 1</li>
                    <li>1 item 2</li>
                    <li>3 item 3</li>
                    <li>1 item 4</li>
                </ul>
            </section>
            <my-full-button label="Edit" />
        </section>
    </section>
</template>