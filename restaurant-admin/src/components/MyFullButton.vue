<template>
    <button
      class="w-full bg-(--my-primary) text-(--my-white) py-2 px-4 rounded-lg hover:bg-(--my-primary-darker) transition duration-300"
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