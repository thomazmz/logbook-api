import { RequestHandler } from "express";

export type AccountController = {
  create: RequestHandler
  findById: RequestHandler
}