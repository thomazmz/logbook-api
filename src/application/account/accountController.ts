import { Account, AccountService } from "../../domain";
import { Request, Response } from "express";

export type AccountController = {
  create(request: Request, response: Response): void
  findById(request: Request, response: Response): void
}

export const accountControllerFactory = (accountService: AccountService): AccountController => ({
  create(request: Request, response: Response): void {
    const { email, username, passwordLiteral } = request.body
    accountService.create(email, username, passwordLiteral)
      .then((account: Account) => response.status(200).send(account))
      .catch((error: Error) => response.status(500).send(error.message))
  },

  findById(request: Request, response: Response): void {
    const accountId = parseFloat(request.params.id)
    accountService.findById(accountId)
      .then((account: Account) => response.status(200).send(account))
      .catch((error: Error) => response.status(500).send(error.message))
  }
})