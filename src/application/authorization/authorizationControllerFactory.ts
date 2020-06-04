import { AuthorizationService } from "../../domain";
import { AuthorizationController } from "./authorizationController"

export const authorizationControllerFactory = (authorizationService: AuthorizationService): AuthorizationController => ({
  findAll(request, response, next) {
    authorizationService.findAll()
      .then(authorizations => response.status(200).send(authorizations))
      .catch((error) => next(error))
  }
})