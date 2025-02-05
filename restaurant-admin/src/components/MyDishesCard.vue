<script setup lang="ts" >
    import MyIngredientTag from '@/components/MyIngredientTag.vue';

    defineProps<{
        label:string;
    }>();
</script>
<template>
    <div class="flex flex-col space-y-2 w-64 h-[400px] hover:scale-90 duration-300">
        <img class="rounded-2xl w-64 shadow-2xl" src="../assets/img/food.jpg" alt="" srcset="">
        <section class="flex flex-col">
            <h1 class="font-bold text-xl">{{ label }}</h1>
            <section class="w-64 flex flex-wrap gap-2">
                <my-ingredient-tag unit="1" label="Ingredient" />
                <my-ingredient-tag unit="2" label="Ingredients" />
                <my-ingredient-tag unit="1" label="Stuff" />
                <my-ingredient-tag unit="2" label="Ingredients" />
            </section>
        </section>
    </div>
</template>