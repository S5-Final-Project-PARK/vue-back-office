<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  link?: string;
  label: string;
}>();

const routeLink = computed(() => {
    return props.link || '/'; // Default to '/' if link is not provided
});

</script>

<template>
    <router-link :to="routeLink" class="px-8 py-4 w-full justify-items-stretch bg-(--my-primary) hover:bg-(--my-primary-darker) transition duration-300 ease-out ">
        <h1 class=" text-center font-montserrat font-bold uppercase text-(--my-white)">{{ label }}</h1>
    </router-link>
</template>