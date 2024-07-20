import { Drink } from "../../types";
const URL_API = "https://www.thecocktaildb.com/api/json/v1/1/";

const fetchAllCocktails = async (): Promise<Drink[]> => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // Array con las letras
  // Iterar sobre el array de letras y hacer las peticiones con la URL dinámica
  const requests = alphabet.map((letter) =>
    fetch(`${URL_API}search.php?f=${letter}`).then((response) =>
      response.json()
    )
  );
  // Esperar a que todas las promesas se resuelvan
  const results = await Promise.all(requests);
  // Combinar los resultados en un solo array
  const allCocktails = results.flatMap((result) => result.drinks || []); // Evitar errores con arrays vacíos

  return allCocktails;
};

const apiDataDrinks = async () => {
  const response = await fetchAllCocktails();

  // Número máximo de ingredientes
  const MAX_INGREDIENTS = 15;

  // Mapear los cócteles a un nuevo formato
  const data = response.map((drink: any) => {
    const {
      idDrink: id,
      strDrink: name,
      strCategory: category,
      strInstructions: instructions,
      strDrinkThumb: image,
      // Extraer ingredientes y medidas dinámicamente
      ...rest
    } = drink;

    // Extraer los ingredientes y medidas
    const ingredients: string[] = [];
    const measures: string[] = [];

    for (let i = 1; i <= MAX_INGREDIENTS; i++) {
      const ingredient: string = drink[`strIngredient${i}`];
      const measure: string = drink[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(ingredient);
        measures.push(measure || ""); // Si la medida es null, usar una cadena vacía
      }
    }

    // Combinar ingredientes y medidas
    const ingredientsAndMeasures: string[] = [];

    for (let i = 0; i < ingredients.length; i++) {
      ingredientsAndMeasures.push(`${measures[i]} ${ingredients[i]}`);
    }

    return {
      id,
      name,
      category,
      instructions,
      image,
      ingredientsAndMeasures,
    };
  });

  return data;
};

export { URL_API, apiDataDrinks };
