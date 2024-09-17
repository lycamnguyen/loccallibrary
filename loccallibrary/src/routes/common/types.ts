/**
 * Shared types for routes.
 */

import { Response, Request } from "express";

// **** Express **** //

type TObj = Record<string, unknown>;

export interface IReq extends Request<TObj, void, TObj, TObj> {
  signedCookies: Record<string, string>;
}

export type IRes = Response<unknown>;
