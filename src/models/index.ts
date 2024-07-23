const fs = require("fs");

const path = "./src/db/newCocktails.json";

const createFile = (data: string[]) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
  fs.writeFileSync(path, JSON.stringify(data));
};

const readFile = () => {
  const readFileJs = fs.readFileSync(path, { encoding: "Utf-8" });
  return JSON.parse(readFileJs);
};

export { createFile, readFile };
