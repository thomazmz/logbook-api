import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { AccountService, accountServiceFactory } from './accountService'
import { AccountRepository } from './accountRepository'
import { Account } from './account'

describe('AccountService tests', () => {

  let accountService: AccountService
  let accountRepository: Mock<AccountRepository>

  beforeEach(async () => {
    accountRepository = createMock<AccountRepository>()
    accountService = accountServiceFactory(accountRepository)
  })

  it('should return created account', async () => {
    // Given
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    const account = new Account({ email, username })
    // When
    accountRepository.save.mockResolvedValue(account)
    const createdAccount = await accountService.create(email, username, passwordLiteral)
    // Then
    expect(createdAccount).toBe(account)
  })

  it('should return appropriate error message if email is already in use', async () => {
    // Given
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    const account = new Account({ email, username })
    accountRepository.findOneByEmail.mockResolvedValue(account)
    // When/Then
    await expect(accountService.create(email, username, passwordLiteral)).rejects.toThrow('Email already in use.')
  })

  it('should return appropriate error message if username is already in use', async () => {
    // Given
    const email = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    accountRepository.findOneByUsername.mockResolvedValue(createMock<Account>())
    // When/Then
    await expect(accountService.create(email, username, passwordLiteral)).rejects.toThrow('Username already in use.')
  })

  it('should return account by id', async () => {
    // Given
    const id = 1
    const email = 'some@email.com'
    const username = 'someUsername'
    const account = new Account({ id, email, username })
    accountRepository.findById.calledWith(id).mockResolvedValue(account)
    // When
    const findedAccount = await accountService.findById(id)
    // Then
    expect(findedAccount.id).toBe(id)
    expect(findedAccount.email).toBe(email)
    expect(findedAccount.username).toBe(username)
  })
})