<script setup lang="ts">
import MyIngredientTag from '@/components/MyIngredientTag.vue';

defineProps<{
    label: string;
    recipeIngredients: { 
        id: number; 
        ingredients: { id: number; name: string; Quantity: number; };
        quantity: number; // ✅ Include quantity for clarity
    }[];
}>();


</script>

<template>
    <div class="flex flex-col space-y-2 w-64 h-[400px] hover:scale-90 duration-300">
        <img class="rounded-2xl w-64 shadow-2xl" src="../assets/img/food.jpg" alt="Dish Image" />
        <section class="flex flex-col">
            <h1 class="font-bold text-xl">{{ label }}</h1>
            <section class="w-64 flex flex-wrap gap-2">
                <!-- ✅ Correctly loop through recipeIngredients -->
                <my-ingredient-tag 
                    v-for="item in recipeIngredients" 
                    :key="item.id" 
                    :unit="item.quantity" 
                    :label="item.ingredients.name" 
                />
            </section>
        </section>
    </div>
</template>

