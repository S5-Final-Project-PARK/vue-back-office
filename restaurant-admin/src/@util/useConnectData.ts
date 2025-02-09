import axios from 'axios'
import type { Ingredient } from './interace/Ingredient'

const backEndLink = 'https://cookscape-domain.up.railway.app'

export async function getIngredients() {
  try {
    const response = await axios.get(backEndLink + '/ingredients/list')
    return response.data // ✅ Return correct array type
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return [] // ✅ Ensure function always returns an array
  }
}

export async function restockIngredientStock(ingredientsId: string, Quantity: number) {
  await axios.post(backEndLink + '/ingredients/add-quantity', {
    ingredient_id: ingredientsId,
    added_quantity: Quantity,
  })
}

export async function getRecipes() {
  try {
    const response = await axios.get(backEndLink + '/recipe/list')
    return response.data // ✅ Return correct array type
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return [] // ✅ Ensure function always returns an array
  }
}

export async function insertRecipe(dishId: number, ingredients: Ingredient[]) {
  try {
    const response = await axios.post(`${backEndLink}/recipes/create`, {
      dish_id: dishId,
      ingredients: ingredients.map((ingredient) => ({
        id: ingredient.id,
        quantity: ingredient.Quantity,
      })),
    })

    console.log('Recipe inserted successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error inserting recipe:', error)
    throw error
  }
}

export async function getDishes() {
  try {
    const response = await axios.get(backEndLink + '/dishes/list')
    return response.data // ✅ Return correct array type
  } catch (error) {
    console.error('Error fetching dishes:', error)
    return [] // ✅ Ensure function always returns an array
  }
}

export async function deleteDishes(id:number){
  try {
    console.log(id);
    const response = await axios.delete(`${backEndLink}/dishes/delete/${id}`)

    console.log('delete dishes successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error delete dishes:', error)
    throw error
  }
}

export async function insertDishes(disheName: string, dishPrice: number) {
  await axios.post(backEndLink + '/dishes/create', {
    name: disheName,
    price: dishPrice,
  })
}


export async function getOrders(){
  try {
    const response = await axios.get(backEndLink + '/orders/list')
    return response.data // ✅ Return correct array type
  } catch (error) {
    console.error('Error fetching orders:', error)
    return [] // ✅ Ensure function always returns an array
  }
}