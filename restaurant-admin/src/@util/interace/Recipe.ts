import type { Dish } from "./Dish";
import type { Ingredient } from "./Ingredient";

export interface Recipe{
    id: number;
    Dish:Dish;
    recipeIngredients:{
        id: number;
        ingredients: Ingredient;
    }[];
}