const Net = require("net");
import { Drink } from "./types";

// defino la logica para crear la coneccion
const client = new Net.createConnection({ port: 3000 });

//aca lo conecto
client
  .on("connect", () => {
    const drink = {
      id: "12917980",
      name: "Alabama Slammer",
      category: "Coctel",
      instructions:
        "Llena un vaso alto con hielo. Vierte el amaretto, el whisky bourbon y el licor de durazno sobre el hielo. Luego, llena con jugo de naranja y revuelve suavemente.",
      ingredientsAndMeasures: [
        "1 oz Amaretto",
        "1 oz Whisky bourbon",
        "1 oz Licor de durazno",
        "Jugo de naranja",
      ],
    };

    const data = { action: "getAllDrinks" };
    // const data = { action: "getDrinkById", body: drink };
    // const data = { action: "getDrinkByName", body: drink };
    // const data = { action: "getDrinkByIngredient", body: drink };
    // const data = { action: "createDrink", body: drink };

    const response = JSON.stringify(data); //transformo mi obj en json

    client.write(response); //le envio la peticion al server
  })
  .on("data", (messageServer: Drink | Drink[]) => {
    const msgToString = messageServer.toString(); // me lo tiene que devolver en json por que lo tengo que guardar en la db
    console.log(msgToString);
  });
