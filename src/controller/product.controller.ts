import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
import type { product } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  const products = productService();

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
};
