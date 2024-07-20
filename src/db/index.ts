import { Drink, Ingredient } from "../../types";
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

const fetchAllIngredients = async (): Promise<Ingredient[]> => {
  // Obtener la lista de nombres de todos los ingredientes
  const response = await fetch(`${URL_API}list.php?i=list`);
  const data = await response.json();

  //creo un array con todos los ingredientes
  const ingredientNames = data.drinks.map(
    (ingredient: { strIngredient1: string }) => ingredient.strIngredient1
  );

  // Hacer solicitudes adicionales para obtener la descripción de cada ingrediente
  const requests = ingredientNames.map((ingredient: Ingredient) =>
    fetch(`${URL_API}search.php?i=${ingredient}`).then((response) =>
      response.json()
    )
  );

  const results = await Promise.all(requests);
  const allIngredients = results.flatMap((result) => result.ingredients || []);
  console.log(allIngredients);

  return allIngredients;
};

export const apiDataDrinks = async () => {
  const response = await fetchAllCocktails();

  // Mapear los cócteles a un nuevo formato
  const data = response.map((drink: Drink) => {
    const {
      idDrink: id,
      strDrink: name,
      strCategory: category,
      strInstructions: instructions,
      strDrinkThumb: image,
    } = drink;

    return { id, name, category, instructions, image };
  });

  return data;
};

export const apiDataIngredients = async () => {
  const response = await fetchAllIngredients();

  // Mapear los ingredientes a un nuevo formato
  const data = response.map((ingredient: Ingredient) => {
    const {
      idIngredient: id,
      strType: name,
      strDescription: description,
    } = ingredient;

    return { id, name, description };
  });

  return data;
};

//apiDataIngredients().then((data) => console.log(data));
fetchAllIngredients().then((data) => console.log(data));
