import { RequestHandler } from "express";

export type AuthorizationController = {
  findAll: RequestHandler
}