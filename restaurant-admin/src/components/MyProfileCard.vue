<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import 'primeicons/primeicons.css';

const email = ref("");
const router = useRouter();

onMounted(() => {
    email.value = localStorage.getItem("email") || "No email found"; // Fallback text
});

// Logout Function
function handleLogout() {
    localStorage.clear();  // Clears all stored data
    router.push("/");  // Redirects to home page
}
</script>

<template>
    <div class="flex flex-col space-y-4 absolute right-0 mt-16 w-64 p-6 bg-(--my-white) shadow-lg rounded-lg">
        <!-- User Icon -->
        <section class="flex justify-center">
            <div class="bg-gray-400 w-24 h-24 flex items-center justify-center rounded-full">
                <i class="pi pi-user text-5xl text-white"></i>
            </div>
        </section>

        <!-- Email & Logout -->
        <section class="font-nacelle text-center">
            <h1 class="text-(--my-black) font-bold">{{ email }}</h1>
            <button 
                @click="handleLogout"
                class="flex items-center justify-center space-x-2 text-red-800 font-semibold cursor-pointer hover:text-red-600 transition"
            >
                <i class="pi pi-sign-out"></i>
                <span>Log Out</span>
            </button>
        </section>
    </div>
</template>
