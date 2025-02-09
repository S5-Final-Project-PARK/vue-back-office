<script setup lang="ts">
import { deleteDishes } from '@/@util/useConnectData';
import gsap from 'gsap';
import { watch, defineProps, defineEmits } from 'vue';

// Props
const props = defineProps<{
    isOpen: boolean;
    dishName: string;
    dishId: number;
}>();

// Emits
const emit = defineEmits(["confirm", "close"]);

// Close modal with animation
function closeModal() {
    gsap.to("#delete-window", { opacity: 0, y: -20, duration: 0.3, onComplete: () => emit("close") });
}

// Watch for modal open state and animate
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        gsap.fromTo("#delete-window", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    }
});

async function handleDelete() {
    try {
        await deleteDishes(props.dishId); // Call the deleteDishes function
        emit("confirm"); // Emit the confirm event after successful deletion
        closeModal();    // Close the modal after deletion
    } catch (error) {
        // Handle errors (e.g., display an error message to the user)
        console.error("Error during deletion:", error);
        alert("An error occurred during deletion. Please try again."); // Example error handling
    }
}
</script>

<template>
    <div v-if="isOpen"
        id="delete-window"
        class="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white shadow-2xl rounded-lg p-6 z-50 w-96 text-center border-2 border-gray-300">
        <h2 class="text-2xl font-bold text-red-600">Confirm Deletion</h2>
        <p class="text-gray-600 my-4">Are you sure you want to delete <strong>{{ dishName }}</strong>?</p>
        <div class="flex justify-center space-x-4">
            <button @click="closeModal"
                class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
            <button @click="handleDelete"  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
        </div>
    </div>
</template>