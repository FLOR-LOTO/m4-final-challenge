import { apiDataDrinks } from "../db";
import { readFile, createFile } from "../models";
import { CreateDrink } from "../../types";
const uuid = require("uuid");

// guardo la funcion readFile() en una variable para reutilizarla en las demas funciones
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
  drink.id = uuid.v4();
  allDrinksJSON.push(drink);
  createFile(allDrinksJSON);
  return "Cocktail creado exitosamente.";
};

// console.log(
//   createDrink({
//     id: "1",
//     name: "jugo",
//     category: "trago",
//     instructions: "servir",
//     ingredientsAndMeasures: ["1 medida de jugo"],
//   })
// );

//console.log(getAllDrinks().then((res) => console.log(res)));

//console.log(getDrinkByIngredient("gin").then((res) => console.log(res)));

export {
  getAllDrinks,
  getDrinkById,
  getDrinkByName,
  getDrinkByIngredient,
  createDrink,
};
