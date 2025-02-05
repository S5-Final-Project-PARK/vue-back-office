<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import SplitType from "split-type";

onMounted(() => {
  // Split the text into lines
  const splitTitle = new SplitType("#title", { types: "lines" });

  gsap.from("#title",{
    opacity:0,
    y:80,
    ease:"inOut",
    duration:2,
  });
  // Animate each paragraph separately
  gsap.from(splitTitle.lines, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "out",
    stagger: 0.4, // Delay between each paragraph
  });
});
</script>

<template>
  <header class="flex items-center justify-center my-16">
    <h1 id="title" class=" text-(--my-black) lg:text-6xl sm:text-5xl font-nacelle font-extralight text-center flex flex-col space-y-2">
      <p>Your <span class="text-(--my-primary) font-bold font-montserrat italic">kitchen,</span></p>
      <p>your <span class="text-(--my-secondary) font-bold font-montserrat italic">way,</span></p>
      <p>all in one place.</p>
    </h1>
  </header>
</template>
