<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';

const props = defineProps<{
    label: string;
    checked?: boolean; // New optional prop to predefine the state
}>();

const radioCheckTrue = "px-4 py-2 text-(--my-white) bg-(--my-primary) border-2 border-(--my-primary) rounded-2xl hover:bg-(--my-primary-darker) hover:border-(--my-primary-darker)";
const radioCheckFalse = "px-4 py-2 text-(--my-primary) bg-(--my-white) border-2 border-(--my-primary) rounded-2xl hover:bg-gray-200 duration-300";

// Reactive variable for radio button state
const radioCSS = ref(props.checked ? radioCheckTrue : radioCheckFalse);

// Function to toggle button state
function onClick() {
    radioCSS.value = (radioCSS.value === radioCheckFalse) ? radioCheckTrue : radioCheckFalse;
}

// Watch for changes to the `checked` prop (useful for dynamic updates)
watch(() => props.checked, (newVal) => {
    radioCSS.value = newVal ? radioCheckTrue : radioCheckFalse;
});
</script>

<template>
    <section @click="onClick" :class="radioCSS">
        <section class="flex flex-row space-between">
            <span>{{ label }}</span>
        </section>
    </section>
</template>
