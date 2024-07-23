import { Drink } from "./types";
import net from "net";
import { processArguments } from "./src/views";

//creo el servidor TCP
const server = net.createServer();
const port = 3000;

server
  .on("connection", (socket: net.Socket) => {
    //Esto establece un listener para el evento "connection", que se activa cuando un cliente se conecta al servidor.
    console.log("Se conectó un cliente");

    //el módulo net maneja internamente la conversión de los datos recibidos en el socket a Buffer.
    socket.on("data", (data: Buffer) => {
      const messageClient = data.toString();
      const sendDataClient = processArguments(messageClient);
      //lo convierto para responder al cliente
      const jsonResponse = JSON.stringify(sendDataClient);

      socket.write(jsonResponse);
    });
  })
  .listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}.`);
  });
