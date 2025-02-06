<script setup lang="ts">
import { ref } from 'vue';

    defineProps<{
        label:string,
    }>();

    const radioCheckTrue = "px-4 py-2 text-(--my-white) bg-(--my-primary) border-2 border-(--my-primary) rounded-2xl hover:bg-(--my-primary-darker) hover:border-(--my-primary-darker)";
    const radioCheckFalse = "px-4 py-2 text-(--my-primary) bg-(--my-white) border-2 border-(--my-primary) rounded-2xl hover:bg-gray-200 duration-300";

    const radioCSS = ref(radioCheckFalse);

    function onClick(){
        if(radioCSS.value == radioCheckFalse){
            radioCSS.value = radioCheckTrue;
        }else{
            radioCSS.value = radioCheckFalse;
        }
    }
</script>
<template>
    <section @click="onClick" :class=radioCSS >
        <section class="flex flex-row space-between">
            <span> {{ label }}</span>
        </section>
    </section>
</template>