<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const login = () => {
  console.log('Logging in with:', email.value, password.value);
};
</script>

<template>

  <body class="min-h-screen bg-(--my-white)">
    <div class="pt-32">
      <header class="flex items-center justify-center">
        <h1 class="font-bold font-nacelle text-(--my-black)">
          <p class="text-4xl ">Welcome to</p>
          <p class="text-6xl text-(--my-primary)">Cookscape</p>
        </h1>
      </header>
      <!--<main class=" items-center justify-centermax-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
      <h2 class="text-center text-gray-500">Admin Login</h2>

      <section>
        <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
        <input v-model="email" type="email"
          class="w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter your email" />
      </section>

      <section>
        <label class="mb-2 block text-sm font-medium text-gray-700">Password</label>
        <input v-model="password" type="password"
          class="w-full rounded-lg border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter your password" />
      </section>

      <button @click="login" class="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
        Log In
      </button>

      <p class="text-center text-sm text-gray-500">
        Forgot password? <a href="#" class="text-blue-500 hover:underline">Click here</a>
      </p>
    </main>-->
    </div>
  </body>

</template>
