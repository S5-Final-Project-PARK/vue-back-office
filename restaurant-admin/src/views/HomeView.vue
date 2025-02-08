<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyFooter from '@/components/MyFooter.vue';
import MyHomeHeader from '@/components/MyHomeHeader.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { onMounted, ref, watchEffect } from 'vue';
import MyDownloadSection from '@/components/MyDownloadSection.vue';
import 'primeicons/primeicons.css'
import MyPlaySection from '@/components/MyPlaySection.vue';

// Function to track screen width
const screenWidth = useScreenWidth();
const defaultScreenWidth = ref(screenWidth.value);
const isScreenLarge = ref(true);

onMounted(()=>{
  const token = localStorage.getItem("email");
  console.log(token);
})


// ✅ Reactively update `isScreenLarge`
/*watchEffect(() => {
  isScreenLarge.value = screenWidth.value  >= defaultScreenWidth.value/2;
});*/
</script>

<template>
  <body class="bg-(--my-pure-white)">
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else />
    <my-home-header />
    <main>
      <my-download-section />
      <my-play-section/>
    </main>
    <my-footer />
  </body>
</template>
