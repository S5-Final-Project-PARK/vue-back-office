<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // ✅ Import useRouter
import MyLoginHeader from '@/components/MyLoginHeader.vue';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';

const router = useRouter(); // ✅ Define router instance
const email = ref('');
const password = ref('');
const loginCheck = ref(true);

function handleSubmit() {
    const emailCheck = "pyvas17@gmail.com";
    const passwordCheck = "root";

    if (email.value === emailCheck && password.value === passwordCheck) {
        loginCheck.value = true; // ✅ Reset error message
        router.push('/home'); // ✅ Redirect to '/home' instead of '/about'
    } else {
        loginCheck.value = false; // ❌ Show error message
    }
}
</script>


<template>
    <body class="min-h-screen bg-[--my-pure-white] font-nacelle">
        <div class="pt-32">
            <MyLoginHeader />
            <main class="flex items-center justify-center space-y-6 rounded-lg">
                <article class="container bg-[--my-white] rounded-xl px-4 py-8 w-2/5 box-shadow-">
                    <div class="flex flex-col space-y-8">
                        <section class="flex flex-col space-y-4">
                            <MyInput type="email" label="Your Email" placeholder="JohnDoe@gmail.com" id="email"
                                v-model="email" />
                            <MyInput type="password" label="Password" placeholder="Password" id="password"
                                v-model="password" />
                        </section>

                        <!-- ✅ Fixed v-if syntax -->
                        <p v-if="!loginCheck" class="text-red-800 text-sm">
                            ❌ Wrong email OR password. Please try again.
                        </p>

                        <!-- ✅ Prevent default form submission -->
                        <MyFullButton @click="handleSubmit" label="Log In" />
                    </div>
                </article>
            </main>

            <footer class="text-xs font-extralight flex items-center justify-center mt-12">
                &copy; ETU 2876, ETU 2670, ETU 2814, ETU 2703
            </footer>
        </div>
    </body>
</template>
