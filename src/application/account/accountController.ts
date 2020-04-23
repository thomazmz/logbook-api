import { AccountService } from "../../domain";
import { Request, Response } from "express";

export type AccountController = {
  create(request: Request, response: Response): void
}

export const accountControllerFactory = (accountService: AccountService): AccountController => ({
  async create(request: Request, response: Response) {
    const { email, username, passwordLiteral } = request.body
    accountService.create(email, username, passwordLiteral)
      .then(account => response.status(200).send(account))
      .catch(error => response.status(500).send(error.message))
  }
})