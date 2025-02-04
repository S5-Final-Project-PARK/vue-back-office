<script setup lang="ts">
import { useScreenWidth } from '@/@util/useScreenWidth';
import MyHomeHeader from '@/components/MyHomeHeader.vue';
import MyNavigation from '@/components/MyNavigation.vue';
import MyNavigationShort from '@/components/MyNavigationShort.vue';
import { ref, watchEffect } from 'vue';

// Function to track screen width
const screenWidth = useScreenWidth();
const defaultScreenWidth = ref(screenWidth.value); 
const isScreenLarge = ref(true);

// ✅ Reactively update `isScreenLarge`
watchEffect(() => {
  isScreenLarge.value = screenWidth.value  >= defaultScreenWidth.value/2;
});
</script>

<template>
  <div class="bg-[--my-pure-white]">
    <my-navigation v-if="isScreenLarge" />
    <my-navigation-short v-else/>
    <my-home-header />
    <!--
    <p class="text-center mt-4">Default Screen Width: {{ defaultScreenWidth }}px</p>
    <p class="text-center mt-4">Current Screen Width: {{ screenWidth }}px</p>
    <p class="text-center mt-4">Navigation Visible: {{ isScreenLarge }}</p>
    -->
  </div>
</template>
