
import { OK } from "http-status";

import { createResponder, isResponder } from "../utils/responders";

const ApiSuccessName = "ApiSuccess";

const ApiSuccessParser = (value: any) => { return { status:'success', data: value } };

export const ApiSuccess = createResponder(ApiSuccessName, ApiSuccessParser, OK);

export function isApiSuccess(responder: any): responder is typeof ApiSuccess {
  return isResponder(responder) && responder.name === ApiSuccessName;
}