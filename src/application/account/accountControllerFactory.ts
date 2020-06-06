import { AccountService } from "../../domain";
import { AccountController } from './accountController';

export const accountControllerFactory = (accountService: AccountService): AccountController => ({

  create(request, response, next) {
    const { email, username, passwordLiteral } = request.body
    accountService.create(email, username, passwordLiteral)
      .then((account) => response.status(200).send(account))
      .catch((error) => next(error))
  },

  findOne(request, response, next) {
    const accountId = parseFloat(request.params.id)
    accountService.findById(accountId)
      .then((account) => response.status(200).send(account))
      .catch((error) => next(error))
  }
})