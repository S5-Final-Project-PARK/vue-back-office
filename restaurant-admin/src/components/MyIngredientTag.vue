<script setup lang="ts">
defineProps<{
  unit: number;
  label: string;
}>();
</script>
<template>
    <span class="px-4 py-2 rounded-full border-2 text-xs text-center">{{unit}} {{ label }}</span>
</template>