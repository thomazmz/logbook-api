import { RequestHandler } from 'express'
import { AuthorizationService } from '../../domain'

export const findAll = (authorizationService: AuthorizationService): RequestHandler => {
  return (req, res, next) => {
    authorizationService.findAll()
      .then(authorizations => res.status(200).send(authorizations))
      .catch((error) => next(error))
  }
}