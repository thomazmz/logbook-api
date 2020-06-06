import { RequestHandler } from "express";

export type AccountController = {
  create: RequestHandler
  findOne: RequestHandler
}