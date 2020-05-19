import { Account, AccountService } from "../../domain";
import { Request, Response, NextFunction } from "express";

export type AccountController = {
  create(request: Request, response: Response, next: NextFunction): void
  findById(request: Request, response: Response, next: NextFunction): void
}

export const accountControllerFactory = (accountService: AccountService): AccountController => ({

  create(request: Request, response: Response, next: NextFunction): void {
    const { email, username, passwordLiteral } = request.body
    accountService.create(email, username, passwordLiteral)
      .then((account: Account) => response.status(200).send(account))
      .catch((error: Error) => next(error))
  },

  findById(request: Request, response: Response, next: NextFunction): void {
    const accountId = parseFloat(request.params.id)
    accountService.findById(accountId)
      .then((account: Account) => response.status(200).send(account))
      .catch((error: Error) => next(error))
  }
})