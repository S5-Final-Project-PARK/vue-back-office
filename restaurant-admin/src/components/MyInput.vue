<script lang="ts">
import { computed } from 'vue';

export default {
    props: {
        type: { type: String, default: 'text' },
        label: { type: String, required: true },
        placeholder: { type: String, default: '' },
        modelValue: { type: String, required: true }, // Make modelValue required
        id: { type: String, required: true }
    },
    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const emitValue = computed({
            get: () => props.modelValue,
            set: (newValue) => emit('update:modelValue', newValue),
        });

        return { emitValue };
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
            :placeholder="placeholder" :name="id" :id="id" :type="type" v-model="emitValue" />
    </div>
</template>
