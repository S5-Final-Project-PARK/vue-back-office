<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from "gsap";
import MyNavigationItem from './MyNavigationItem.vue';
import MyProfileCard from './MyProfileCard.vue';

const isDropdownOpen = ref(false);

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;

    if (isDropdownOpen.value) {
        gsap.from("#dropdown", {
            duration: 0.2,
            opacity: 0,
            y: -10,
            ease: "power2.out"
        });
    }
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown && !dropdown.contains(event.target as Node)) {
        isDropdownOpen.value = false;
    }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
    <header class="relative flex flex-row justify-evenly">
        <my-navigation-item link="/Home" label="home" />
        <my-navigation-item link="/orders" label="orders" />
        <my-navigation-item link="/Dishes" label="dishes" />
        <my-navigation-item link="/ingredient" label="ingredients" />
        <!--<my-navigation-item link="/Statistics" label="statistics" />-->
        <!-- "You" button with dropdown -->
        <button @click.stop="toggleDropdown"
            class="px-8 py-4 w-full justify-items-stretch bg-(--my-primary) hover:bg-(--my-primary-darker) transition duration-300 ease-out">
            <h1 class=" text-center font-montserrat font-bold uppercase text-(--my-white)">You</h1>
        </button>

        <!-- Dropdown menu -->
        <div id="dropdown">
            <my-profile-card v-if="isDropdownOpen"/>
        </div>
    </header>
</template>
