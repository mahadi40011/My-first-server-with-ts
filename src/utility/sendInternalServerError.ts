import type { ServerResponse } from "http";
import { sendResponse } from "./sendResponse";

export const sendInternalServerError = (res: ServerResponse) => {
  sendResponse(res, 500, false, "Internal Server Error");
};
