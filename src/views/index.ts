import {
  getAllDrinks,
  getDrinkById,
  getDrinkByIngredient,
  getDrinkByName,
  createDrink,
} from "../controllers";

const processArguments = (dataClient: string) => {
  const dataClientJs = JSON.parse(dataClient);

  if (!dataClientJs.action) {
    return "No se envió ninguna acción";
  }
  if (dataClientJs.action === "getAllDrinks") {
    return getAllDrinks().then((res) => console.log(res));
  } else if (dataClientJs.action === "getDrinkById") {
    return getDrinkById(dataClientJs.body.id).then((res) => console.log(res));
  } else if (dataClientJs.action === "getDrinkByName") {
    return getDrinkByName(dataClientJs.body.name).then((res) =>
      console.log(res)
    );
  } else if (dataClientJs.action === "getDrinkByIngredient") {
    return getDrinkByIngredient(dataClientJs.body.ingredientsAndMeasures).then(
      (res) => console.log(res)
    );
  } else if (dataClientJs.action === "createDrink") {
    return createDrink(dataClientJs.body);
  } else return "Esa acción no es válida";
};

export { processArguments };
