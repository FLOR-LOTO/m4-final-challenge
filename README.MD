# Drink Search Application

## Descripción

Esta aplicación permite buscar tragos de todo el mundo. Puedes obtener información sobre tragos existentes, que incluye el nombre, la categoría, las instrucciones para prepararlo y los ingredientes. Además, puedes crear un nuevo trago que se guardará en un archivo JSON y se combinará con los tragos obtenidos desde la API [The CocktailDB](https://www.thecocktaildb.com/).

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/FLOR-LOTO/m4-final-challenge.git
   ```

# Uso

### Ejecutar el servidor

Para iniciar el servidor, ejecuta el siguiente comando:

- `npm run server`  
  (El servidor escuchará en el puerto 3000)

### Ejecutar el cliente

Para iniciar el cliente, ejecuta el siguiente comando:

- `npm run client`

# Crear un nuevo trago

Para crear un nuevo trago, utiliza el siguiente formato en el archivo `client.ts`:

Ejemplo:

const drink = {  
`id`: "",  
`name`: "Alabama Slammer",  
`category`: "Coctel",  
`instructions`: "Llena un vaso alto con hielo. Vierte el amaretto, el whisky bourbon y el licor de durazno sobre el hielo. Luego, llena con jugo de naranja y revuelve suavemente.",  
`ingredientsAndMeasures`: [
"1 oz Amaretto",
"1 oz Whisky bourbon",
"1 oz Licor de durazno",
"Jugo de naranja"
]  
}

El id se asignará de forma aleatoria.

# Realizar peticiones

Para realizar las peticiones, modifica manualmente el archivo `client.ts` descomentando la variable `data` con la acción indicada.  
Por ejemplo, si queremos traer todos los tragos:

`const data = { action: "getAllDrinks" }; `
// const data = { action: "getDrinkById", body: drink };  
// const data = { action: "getDrinkByName", body: drink };
// const data = { action: "getDrinkByIngredient", body: drink };
// const data = { action: "createDrink", body: drink };

Descomenta la línea correspondiente a la acción que deseas realizar y luego ejecuta el cliente nuevamente.
