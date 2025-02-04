<script lang="ts">
import { ref, computed } from 'vue';

export default {
    props: {
        type: {
            type: String,
            default: 'text', // Default input type
        },
        label: {
            type: String,
            required: true, // Label is required
        },
        placeholder: {
            type: String,
            default: '', // Placeholder is optional
        },
        modelValue: { // Use modelValue for v-model in components
            type: String,
            default: '',
        },
        id: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'], // Emit the update event

    setup(props, { emit }) {
        const inputValue = ref(props.modelValue);

        // Use computed property to emit the value on input change
        const emitValue = computed({
            get() {
                return inputValue.value;
            },
            set(newValue) {
                inputValue.value = newValue;
                emit('update:modelValue', newValue); // Emit the new value
            },
        });

        return { inputValue, emitValue };
    },
};
</script>

<template>
    <div class="flex flex-col space-y-1">
        <label class="block text-gray-800" :for="id">
            {{ label }}
        </label>
        <input
            class="w-full px-4 py-2 bg-gray-200 rounded-lg hover:ring-2 hover:ring-(--my-secondary) focus:outline-none focus:ring-2 focus:ring-(--my-secondary) transition duration-300"
            :placeholder="placeholder" :name="id" :id="id" :type="type" v-model="inputValue" />
    </div>
</template>
