interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strDrinkThumb: string;
}

interface CreateDrink {
  id: string;
  name: string;
  category: string;
  instructions: string;
  ingredientsAndMeasures: string[];
}

export { Drink, CreateDrink };
