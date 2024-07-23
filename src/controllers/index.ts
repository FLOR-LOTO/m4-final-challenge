import { apiDataDrinks } from "../db";
import { readFile, createFile } from "../models";
import { CreateDrink } from "../../types";
import { validationsCreateDrink } from "../utils/validations";
const uuid = require("uuid");

const allDrinksJSON = readFile();

enum Message {
  NOT_EXIST = "La información solicitada no existe en nuestra base de datos",
  CREATE_OK = "Cocktail creado exitosamente",
}

const getAllDrinks = async () => {
  const drinksFromAPI = await apiDataDrinks();
  const drinksFromFile = allDrinksJSON;
  return [...drinksFromFile, ...drinksFromAPI];
};

const getDrinkByName = async (name: string) => {
  const drinks = await getAllDrinks();
  const drinkName = drinks.filter((drink) => drink.name.includes(name));
  return drinkName.length ? drinkName : `${Message.NOT_EXIST}`;
};

const getDrinkById = async (id: string) => {
  const drinks = await getAllDrinks();
  const drinkId = drinks.find((drink) => drink.id.includes(id));
  return drinkId ? drinkId : `${Message.NOT_EXIST}`;
};

const getDrinkByIngredient = async (ingredient: string) => {
  const drinks = await getAllDrinks();

  //some devuelve true si al menos un elemento del array cumple con la condición
  const drinkIngredient = drinks.filter((drink) =>
    drink.ingredientsAndMeasures.some((someIngredient: string) =>
      someIngredient.includes(ingredient)
    )
  );
  return drinkIngredient.length ? drinkIngredient : `${Message.NOT_EXIST}`;
};

const createDrink = (drink: CreateDrink) => {
  const isValidate = validationsCreateDrink(drink);

  if (typeof isValidate === "string") {
    return isValidate;
  }
  drink.id = uuid.v4();
  allDrinksJSON.push(drink);
  createFile(allDrinksJSON);
  return `${Message.CREATE_OK}`;
};

export {
  getAllDrinks,
  getDrinkById,
  getDrinkByName,
  getDrinkByIngredient,
  createDrink,
};
