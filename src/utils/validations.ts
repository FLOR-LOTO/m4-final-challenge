import { CreateDrink } from "../../types";

export const validationsCreateDrink = (data: CreateDrink) => {
  if (
    !data.name ||
    !data.category ||
    !data.instructions ||
    !data.ingredientsAndMeasures
  ) {
    // si no hay alguno de los datos
    return "Debe ingresar todas las propiedades solicitadas";
  }
  if (
    !Array.isArray(data.ingredientsAndMeasures) ||
    data.ingredientsAndMeasures.length === 0
  ) {
    // debe ser array y debe tener un elemento como minimo
    return "Tags debe ser un array con al menos un elemento";
  }
  if (typeof data.name !== "string") {
    // si el nombre no es un string
    return "El NAME debe ser de una cadena de texto";
  }
  // Object.keys(data) devuelve un array con todas las propiedades del objeto data
  // some devuelve true o false -> metodo de array verifica si almenos un elemento cumple con la condicion
  if (
    Object.keys(data).some(
      (key) =>
        key !== "id" &&
        key !== "name" &&
        key !== "category" &&
        key !== "instructions" &&
        key !== "ingredientsAndMeasures"
    )
  ) {
    return "Propiedades no permitidas";
  }
};
