import { RequestHandler } from 'express'

export const authenticationHandler = (): RequestHandler => {
  return (req, res, next): void => {
    next()
  }
}