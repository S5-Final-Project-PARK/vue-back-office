<script setup lang="ts">
import MyDownloadButton from '@/components/MyDownloadButton.vue';

import pdfFile from '@/assets/documentation.pdf'; // Import the PDF

const downloadPDF = async () => {
  const response = await fetch(pdfFile);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'documentation.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url); // Clean up
};
</script>
<template>
    <article class="flex flex-col space-y-4 items-center justify-center font-nacelle text-(--my-black)">
        <h1 class="font-nacelle font-bold text-4xl">On The Ready</h1>
        <section class="flex lg:flex-row lg:space-x-4 flex-col space-y-4">
          <my-download-button  @click="downloadPDF" label="Download our guide!(Documentation)"/>
          <my-download-button label="Download our app!"/>
        </section>
      </article>
</template>