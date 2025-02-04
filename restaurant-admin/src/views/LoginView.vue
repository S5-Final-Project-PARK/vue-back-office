<script setup lang="ts">
import { ref } from 'vue';
import MyLoginHeader from '@/components/MyLoginHeader.vue';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';

const email = ref('');
const password = ref('');

const login = () => {
    console.log('Logging in with:', email.value, password.value);
};
</script>

<template>
    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <div class="pt-32">
            <MyLoginHeader />
            <main class="flex items-center justify-center space-y-6 rounded-lg">
                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 box-shadow-">
                    <div class="flex flex-col space-y-8">
                        <section class="flex flex-col space-y-2">
                            <MyInput type="email" label="Your Email" placeholder="JohnDoe@gmail.com" id="email"
                                v-model="email" />
                            <MyInput type="password" label="Password" placeholder="Password" id="password"
                                v-model="password" />
                        </section>
                        <MyFullButton @click="login" label="Log In" />
                    </div>
                </article>
            </main>

            <footer class="text-xs font-extralight flex items-center justify-center mt-12">
                &copy; ETU 2876, ETU 2670, ETU 2814, ETU 2703
            </footer>
        </div>
    </body>
</template>
