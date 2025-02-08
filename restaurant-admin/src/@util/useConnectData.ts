import axios from "axios"


const backEndLink = 'https://cookscape-domain.up.railway.app'

export async function getIngredient() {
  try {
      const response = await axios.get(backEndLink+"/ingredients/list");
      return response.data; // ✅ Return correct array type
  } catch (error) {
      console.error("Error fetching ingredients:", error);
      return []; // ✅ Ensure function always returns an array
  }
}
