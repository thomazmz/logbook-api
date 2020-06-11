import { RequestHandler } from 'express'
import { AccountService } from '../../domain'

export const create = (accountService: AccountService): RequestHandler => {
  return (req, res, next) => {
    const { email, username, passwordLiteral } = req.body
    accountService.create(email, username, passwordLiteral)
      .then((account) => res.status(200).send(account))
      .catch((error) => next(error))
  }
}

export const findOne = (accountService: AccountService): RequestHandler => {
  return (req, res, next) => {
    const accountId = parseFloat(req.params.id)
    accountService.findById(accountId)
      .then((account) => res.status(200).send(account))
      .catch((error) => next(error))
  }
}