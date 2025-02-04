<script setup lang="ts">
defineProps<{
  link?: string;
  label: string;
}>();
</script>


<template>
    <a :href="link" class="px-8 py-4 w-full justify-items-stretch bg-(--my-primary) hover:bg-(--my-primary-darker) transition duration-300 ease-out ">
        <h1 class=" text-center font-montserrat font-bold uppercase text-(--my-white)">{{ label }}</h1>
    </a>
</template>