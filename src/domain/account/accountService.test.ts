import { mock, MockProxy as Mock } from 'jest-mock-extended'
import { AccountService, accountServiceFactory } from './accountService'
import { AccountRepository } from './accountRepository'
import { Account } from './account'

describe('Permission service tests', () => {

  let accountService: AccountService
  let accountRepository: Mock<AccountRepository>

  beforeEach(async () => {
    accountRepository = mock<AccountRepository>()
    accountService = accountServiceFactory(accountRepository)
  })

  it('should return created account', async () => {
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'

    const account = new Account({ email, username })
    accountRepository.save.mockResolvedValue(account)
    const createdAccount = await accountService.create(email, username, passwordLiteral)

    expect(createdAccount).toBe(account)
  })

  it('should return appropriate error message if email is already in use', async () => {
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    accountRepository.findOneByEmail.mockResolvedValue(new Account({ email, username }))

    await expect(accountService.create(email, username, passwordLiteral)).rejects.toThrow('Email already in use.')
  })

  it('should return appropriate error message if username is already in use', async () => {
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    accountRepository.findOneByUsername.mockResolvedValue(new Account({ email, username }))

    await expect(accountService.create(email, username, passwordLiteral)).rejects.toThrow('Username already in use.')
  })

  it('should return account by id', async () => {
    const id = 1
    const email = 'some@email.com'
    const username = 'someUsername'
    accountRepository.findById.calledWith(id).mockResolvedValue(new Account({ id, email, username }))

    const findedAccount = await accountService.findById(id)

    expect(findedAccount.id).toBe(id)
    expect(findedAccount.email).toBe(email)
    expect(findedAccount.username).toBe(username)
  })
})