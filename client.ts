const Net = require("net");
import { Drink } from "./types";

// defino la logica para crear la coneccion
const client = new Net.createConnection({ port: 3000 });

//lo conecto
client
  .on("connect", () => {
    const drink = {
      id: "",
      name: "",
      category: "",
      instructions: "",
      ingredientsAndMeasures: ["Anisaje"],
    };

    // const data = { action: "getAllDrinks" };
    // const data = { action: "getDrinkById", body: drink };
    // const data = { action: "getDrinkByName", body: drink };
    const data = { action: "getDrinkByIngredient", body: drink };
    // const data = { action: "createDrink", body: drink };

    //transformo mi obj en json
    const response = JSON.stringify(data);
    //le envio la peticion al server
    client.write(response);
  })
  .on("data", (messageServer: Drink | Drink[]) => {
    // me lo tiene que devolver en json por que lo tengo que guardar en la db
    const msgToString = messageServer.toString();
    console.log(msgToString);
  });
