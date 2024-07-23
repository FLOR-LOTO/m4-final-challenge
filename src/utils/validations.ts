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
    data.ingredientsAndMeasures.length === 0 ||
    data.ingredientsAndMeasures.some((item) => typeof item !== "string")
  ) {
    return "Ingredientes debe ser un array de strings con al menos un elemento";
  }
  if (typeof data.name !== "string") {
    return "El nombre debe ser de una cadena de texto";
  }
  if (typeof data.category !== "string") {
    return "La categoría debe ser de una cadena de texto";
  }
  if (typeof data.instructions !== "string") {
    return "Las instrucciones deben ser de una cadena de texto";
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
