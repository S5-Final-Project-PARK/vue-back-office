<script setup lang="ts">
import { ref } from 'vue';
import MyLoginHeader from '@/components/MyLoginHeader.vue';
import MyInput from '@/components/MyInput.vue';

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
            <main class="flex items-center justify-center space-y-6 rounded-lg ">
                <article class="container px-4 mx-auto">
                    <div class="mx-auto">
                        <div class="max-w-md mx-auto px-8 py-6 bg-(--my-white) rounded-lg shadow-lg">
                            <form class="flex flex-col space-y-4">
                                <section class="flex flex-col space-y-2">
                                    <MyInput type="email" label="Your Email" placeholder="JohnDoe@gmail.com" id="email"
                                        v-model="email" />
                                    <MyInput type="password" label="Password" placeholder="Password" id="password"
                                        v-model="password" />
                                </section>
                                <button
                                    class="w-full bg-(--my-primary) text-(--my-white) py-2 px-4 rounded-lg hover:bg-(--my-primary-darker) transition duration-300"
                                    type="submit">
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </article>
            </main>
            <footer class="text-xs font-extralight flex items-center justify-center mt-50">
                    &copy; ETU 2876, ETU 2670, ETU 2814, ETU 2703
            </footer>
        </div>
    </body>

</template>
