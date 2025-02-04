<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import SplitType from "split-type"; // ✅ Use 'split-type' package

onMounted(() => {
  const cookscape = new SplitType("#cookscape", { types: "chars" });
  const welcome = new SplitType("#welcome", { type: "words" });

  gsap.from("#admin",{
    duration: 1.5,
    rotationX: 360, // Rotates on X-axis
    ease: "back.out(1.7)",
    opacity: 0,
    delay: 1,
  });
  
  gsap.from(cookscape.chars, {
    duration: 0.8,
    opacity: 0,
    x: 80,
    transformOrigin: "0% 50% -50",
    ease: "back",
    stagger: 0.09,
    color: "black",
    delay: "0.8"
  });

  gsap.from(welcome.words, {
    duration: 0.8,
    opacity: 0,
    y: -80,
    transformOrigin: "0% 50% -50",
    ease: "out",
    stagger: 0.4,
  });

});
</script>

<template>
  <header class="flex flex-col items-center justify-center mb-16">
    <h1 class="">
      <p id="welcome" class="text-4xl font-bold text-(--my-black)">Welcome to</p>
      <p id="cookscape" class="text-6xl font-montserrat font-extrabold text-(--my-primary)">Cookscape</p>
      <section class="flex justify-end">
        <p id="admin" class="py-2 px-6 text-(--my-pure-white) bg-(--my-black) rounded-full text-2xl font-extralight">
          Admin Login
        </p>
      </section>
    </h1>
  </header>
</template>
