interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strDrinkThumb: string;
}

interface Ingredient {
  strIngredient1: string;
  idIngredient: string;
  strType: string;
  strDescription: string;
}

export { Drink, Ingredient };
