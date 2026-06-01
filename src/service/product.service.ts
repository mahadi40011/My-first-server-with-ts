import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/products.json");

export const readProducts = () => {
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products);
};

export const insertProduct = (payLoad: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payLoad));
};
