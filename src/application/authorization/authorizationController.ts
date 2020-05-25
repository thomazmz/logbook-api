import { AuthorizationService } from "../../domain";
import { Request, Response, NextFunction } from "express";

export type AuthorizationController = {
  findAll(request: Request, response: Response, next: NextFunction): void
}

export const authorizationControllerFactory = (authorizationService: AuthorizationService): AuthorizationController => ({
  findAll(request: Request, response: Response, next: NextFunction): void {
    const authorizations = authorizationService.findAll()
      .then(authorizations => response.status(200).send(authorizations))
      .catch((error: Error) => next(error))
  }
})