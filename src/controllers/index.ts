import { apiDataDrinks } from "../db";
import { readFile, createFile } from "../models";
import { CreateDrink } from "../../types";
import { validationsCreateDrink } from "../utils/validations";
const uuid = require("uuid");

const allDrinksJSON = readFile();

const getAllDrinks = async () => {
  const drinksFromAPI = await apiDataDrinks();
  const drinksFromFile = allDrinksJSON;
  return [...drinksFromFile, ...drinksFromAPI];
};

const getDrinkByName = async (name: string) => {
  const drinks = await getAllDrinks();
  const drinkName = drinks.filter((drink) => drink.name.includes(name));
  return drinkName.length
    ? drinkName
    : `El cockteil "${name}" no se encuentra en nuestra base de datos`;
};

const getDrinkById = async (id: string) => {
  const drinks = await getAllDrinks();
  const drinkId = drinks.find((drink) => drink.id.includes(id));
  return drinkId
    ? drinkId
    : `El ID "${id}" no se encuentra en nuestra base de datos`;
};

const getDrinkByIngredient = async (ingredient: string) => {
  const drinks = await getAllDrinks();

  //some devuelve true si al menos un elemento del array cumple con la condición
  const drinkIngredient = drinks.filter((drink) =>
    drink.ingredientsAndMeasures.some((someIngredient: string) =>
      someIngredient.includes(ingredient)
    )
  );
  return drinkIngredient.length
    ? drinkIngredient
    : `No hay tragos que contengan "${ingredient}" en nuestra base de datos`;
};

const createDrink = (drink: CreateDrink) => {
  const isValidate = validationsCreateDrink(drink);

  if (typeof isValidate === "string") {
    return isValidate;
  }
  drink.id = uuid.v4();
  allDrinksJSON.push(drink);
  createFile(allDrinksJSON);
  return "Cocktail creado exitosamente.";
};

export {
  getAllDrinks,
  getDrinkById,
  getDrinkByName,
  getDrinkByIngredient,
  createDrink,
};
