<script setup lang="ts">
import 'primeicons/primeicons.css'

    defineProps<{
        label:string;
    }>();
</script>
<template>
    <a
        class="flex flex-row space-x-2 px-8 py-4 h-16 bg-none rounded-full border-2 font-nacelle border-(--my-black) hover:bg-(--my-black) hover:text-(--my-white) duration-300 hover:translate-y-1">
        <i class="pi pi-download"></i>
        <p>{{ label }}</p>
    </a>
</template>