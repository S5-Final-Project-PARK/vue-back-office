import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

export function useAuth() {
    const email = ref('');
    const password = ref('');
    const validationErrors = ref('');
    const isSubmitting = ref(false);
    const router = useRouter();

    const backEndLink = 'https://cookscape-domain.up.railway.app';

    const loginAction = async () => {
        isSubmitting.value = true;
        validationErrors.value = ''; // ✅ Clear previous errors

        try {
            const response = await axios.post(`${backEndLink}/firebase/login`, {
                email: email.value,
                password: password.value,
            });

            localStorage.setItem('token', response.data.token);
            router.push('/home');
        } catch (error: unknown) {
            isSubmitting.value = false;

            if (axios.isAxiosError(error)) {
                // ✅ Ensure `error.response` exists before accessing `data.message`
                return validationErrors.value = error.response?.data?.message || 'Login failed. Please try again.';
            } else {
                return validationErrors.value = 'An unexpected error occurred.';
            }
        }
    };

    return {
        email,
        password,
        validationErrors,
        isSubmitting,
        loginAction,
    };
}
