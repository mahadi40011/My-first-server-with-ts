import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/products.json");

export const productService = () => {
  // console.log(filePath);
  const products = fs.readFileSync(filePath, "utf-8");
  // console.log(products.toString())
  // console.log(JSON.parse(products));
  return JSON.parse(products);
};
