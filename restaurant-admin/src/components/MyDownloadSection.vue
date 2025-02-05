<script setup lang="ts">
import MyDownloadButton from '@/components/MyDownloadButton.vue';

</script>
<template>
    <article class="flex flex-col space-y-4 items-center justify-center font-nacelle text-(--my-black)">
        <h1 class="font-nacelle font-bold text-4xl">On The Ready</h1>
        <section class="flex lg:flex-row lg:space-x-4 flex-col space-y-4">
          <my-download-button label="Download our guide!(Documentation)"/>
          <my-download-button label="Download our app!"/>
        </section>
      </article>
</template>