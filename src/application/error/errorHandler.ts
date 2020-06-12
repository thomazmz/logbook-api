import { AccountService } from '../../domain'
import { ErrorRequestHandler } from 'express'

export const errrorHandler = (accountService: AccountService): ErrorRequestHandler => {
  return (err, req, res, next): void => {
    res.status(500).send(err.message)
  }
}