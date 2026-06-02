import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProducts } from "../service/product.service";
import type { Product } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";
import { sendInternalServerError } from "../utility/sendInternalServerError";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // const id =
  //   urlParts?.[1] === "products" && urlParts?.[2]
  //     ? Number(urlParts[2].split("?")[0])
  //     : null;

  const products = readProducts();

  // get all products
  if (url === "/products" && method === "GET") {
    try {
      return sendResponse(
        res,
        200,
        true,
        "Products retrieved Successfully",
        products,
      );
    } catch (error) {
      return sendInternalServerError(res);
    }
  }

  // get single product
  else if (method === "GET" && id !== null) {
    try {
      const product = products.find((p: Product) => p.id === id);

      if (!product) {
        return sendResponse(res, 404, false, "Product not found!");
      }

      return sendResponse(
        res,
        200,
        true,
        "Product retrieved Successfully",
        product,
      );
    } catch (error) {
      return sendInternalServerError(res);
    }
  }

  // Create a product
  else if (method === "POST" && url === "/products") {
    try {
      const body = await parseBody(req);
      const newProduct = {
        id: Date.now(),
        ...body,
      };
      products.push(newProduct);
      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product created Successfully",
        newProduct,
      );
    } catch (error) {
      return sendInternalServerError(res);
    }
  }

  // Update a product by PUT method
  else if (method === "PUT" && id !== null) {
    try {
      const body = await parseBody(req);
      const index = products.findIndex((p: Product) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 404, false, "product not found!");
      }

      products[index] = { id: products[index].id, ...body };
      insertProduct(products);

      return sendResponse(
        res,
        200,
        true,
        "Product updated Successfully",
        products[index],
      );
    } catch (error) {
      return sendInternalServerError(res);
    }
  }

  // Delete a product by DELETE method
  else if (method === "DELETE" && id !== null) {
    try {
      const index = products.findIndex((p: Product) => p.id === id);

      if (index < 0) {
        return sendResponse(res, 404, false, "product not found!");
      }

      products.splice(index, 1);
      insertProduct(products);

      return sendResponse(res, 200, true, "Product deleted Successfully");
    } catch (error) {
      return sendInternalServerError(res);
    }
  }
};
