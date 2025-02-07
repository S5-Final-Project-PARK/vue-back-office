<template>
    <button
      class="w-full bg-red-800 text-(--my-white) py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      @click="$emit('click')"  >
      {{ label }}
    </button>
  </template>
  
  <script lang="ts">
  export default {
    emits: ['click'],
    props: {
      label: {
        type: String,
        default: 'Button', // Default button label
      },
    },
  };
  </script>