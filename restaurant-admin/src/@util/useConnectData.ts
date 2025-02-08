import axios from "axios"


const backEndLink = 'https://cookscape-domain.up.railway.app'

export async function getIngredients() {
  try {
      const response = await axios.get(backEndLink+"/ingredients/list");
      return response.data; // ✅ Return correct array type
  } catch (error) {
      console.error("Error fetching ingredients:", error);
      return []; // ✅ Ensure function always returns an array
  }
}

export async function restockIngredientStock( ingredientsId:string, Quantity:number){
    await axios.post(backEndLink+"/ingredients/add-quantity",
      {
        ingredient_id:ingredientsId,
        added_quantity:Quantity,
      });
}

export async function getRecipes(){
    try {
      const response = await axios.get(backEndLink+"/recipe/list");
      return response.data; // ✅ Return correct array type
  } catch (error) {
      console.error("Error fetching ingredients:", error);
      return []; // ✅ Ensure function always returns an array
  }
}
