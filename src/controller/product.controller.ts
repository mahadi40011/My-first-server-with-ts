import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const product = [
    {
      id: 1,
      name: "Smart phone",
    },
    {
      id: 2,
      name: "laptop",
    },
  ];

  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved Successfully ",
        data: product,
      }),
    );
  }
};
