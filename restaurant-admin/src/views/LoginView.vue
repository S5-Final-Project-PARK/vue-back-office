<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/@util/useConnect'; // ✅ Import the composable
import MyLoginHeader from '@/components/MyLoginHeader.vue';
import MyInput from '@/components/MyInput.vue';
import MyFullButton from '@/components/MyFullButton.vue';
import MyFooter from '@/components/MyFooter.vue';

const { email, password, loginAction, validationErrors, isSubmitting } = useAuth(); // ✅ Extract variables
const router = useRouter();

// ✅ Check if the user is already logged in
onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
        router.push('/home'); // Redirect to home if a session exists
    }
});
</script>

<template>
    <body class="min-h-screen bg-(--my-pure-white) font-nacelle">
        <div class="pt-32">
            <my-login-header/>
            <main class="flex items-center justify-center space-y-6 rounded-lg">
                <article class="container bg-(--my-white) rounded-xl px-4 py-8 w-2/5 shadow-lg">
                    <div class="flex flex-col space-y-8">
                        <section class="flex flex-col space-y-4">
                            <my-input 
                                type="email" 
                                label="Your Email" 
                                placeholder="JohnDoe@gmail.com" 
                                id="email"
                                v-model="email" 
                            />
                            <my-input 
                                type="password" 
                                label="Password" 
                                placeholder="Password" 
                                id="password"
                                v-model="password" 
                            />
                        </section>

                        <!-- ✅ Show error message if login fails -->
                        <p v-if="Object.keys(validationErrors).length" class="text-red-800 text-sm">
                            ❌ {{ validationErrors }}
                        </p>

                        <!-- ✅ Button changes text when submitting -->
                        <my-full-button 
                            @click="loginAction" 
                            :disabled="isSubmitting" 
                            :label="isSubmitting ? 'Logging in...' : 'Log In'" 
                        />
                    </div>
                </article>
            </main>
            <my-footer/>
        </div>
    </body>
</template>
