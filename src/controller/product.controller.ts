import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProducts } from "../service/product.service";
import type { product } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  const products = readProducts();

  // get all products
  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved Successfully ",
        data: products,
      }),
    );
  }

  // get single product
  else if (method === "GET" && id !== null) {
    const product = products.find((p: product) => p.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved Successfully ",
        data: product,
      }),
    );
  }

  // Create a product
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);

    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Created Successfully ",
        data: newProduct,
      }),
    );
  }
};
