import { RequestHandler } from "express";

export type RoleController = {
  findAll: RequestHandler
  create: RequestHandler
  findOne: RequestHandler
  update: RequestHandler
  getAuthorizations: RequestHandler
  updateAuthorizations: RequestHandler
}