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
  return drinkName;
};

const getDrinkById = async (id: string) => {
  const drinks = await getAllDrinks();
  const drinkId = drinks.find((drink) => drink.id.includes(id));
  return drinkId;
};

const getDrinkByIngredient = async (searchIngredient: string) => {
  const drinks = await getAllDrinks();
  const drinkIngredient = drinks.filter((drink) =>
    //some devuelve true si al menos un elemento del array cumple con la condición
    drink.ingredientsAndMeasures.some((someIngredient: string) =>
      someIngredient.includes(searchIngredient)
    )
  );
  return drinkIngredient;
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
