import { apiDataDrinks } from "../db";

const allDrinks = apiDataDrinks();

class Drink {
  constructor() {}

  async getAllDrinks() {
    const drinks = await allDrinks;
    return drinks;
  }

  getDrinkByName(name: string) {
    console.log(name);
  }

  getDrinkById(id: string) {}

  getDrinkByIngredient(ingredient: string) {}
}

const drinks = new Drink().getAllDrinks();

console.log(drinks);
