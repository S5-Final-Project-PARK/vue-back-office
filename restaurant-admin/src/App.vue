<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  console.log('Logging in with:', email.value, password.value);
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
      <h2 class="text-center text-2xl font-bold text-gray-800">Welcome to Cookscape</h2>
      <p class="text-center text-gray-500">Admin Login</p>

      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter your password"
        />
      </div>

      <button
        @click="login"
        class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        Log In
      </button>

      <p class="text-center text-sm text-gray-500">
        Forgot password? <a href="#" class="text-blue-500 hover:underline">Click here</a>
      </p>
    </div>
  </div>
</template>
