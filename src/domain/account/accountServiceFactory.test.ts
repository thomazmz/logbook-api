import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { UnavailableEntityIdentifierError, InvalidEntityIdentifierError } from '../errors'
import { accountServiceFactory } from './accountServiceFactory'
import { AccountService } from './accountService'
import { AccountRepository } from './accountRepository'
import { Account } from './account'
import { Role } from '../role'

describe('AccountService tests', () => {

  let accountService: AccountService
  let accountRepository: Mock<AccountRepository>

  beforeEach(async () => {
    accountRepository = createMock<AccountRepository>()
    accountService = accountServiceFactory(accountRepository)
  })

  test('create should return created Account instance', async () => {
    // Given
    const emailAddress = 'some@emailAddress.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    const account = new Account({ emailAddress, username })
    // When
    accountRepository.save.mockResolvedValue(account)
    const createdAccount = await accountService.create(emailAddress, username, passwordLiteral)
    // Then
    expect(createdAccount).toBeInstanceOf(Account)
    expect(createdAccount).toBe(account)
  })

  test('create should throw UnavailableEntityIdentifier if email address is already in use', async () => {
    // Given
    const emailAddress = 'some@emailAddress.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    const account = new Account({ emailAddress, username })
    accountRepository.findOneByEmailAddress.mockResolvedValue(account)
    // When
    const createAccountPromise = accountService.create(emailAddress, username, passwordLiteral)
    // Then
    await expect(createAccountPromise).rejects.toThrow(UnavailableEntityIdentifierError)
  })

  test('create should throw UnavailableEntityIdentifier if username is already in use', async () => {
    // Given
    const emailAddress = 'some@email.com'
    const username = 'someUsername'
    const passwordLiteral = '12345'
    accountRepository.findOneByUsername.mockResolvedValue(createMock<Account>())
    // When
    const createAccountPromise = accountService.create(emailAddress, username, passwordLiteral)
    // Then
    await expect(createAccountPromise).rejects.toThrow(UnavailableEntityIdentifierError)
  })

  test('findById should return Account entity by id', async () => {
    // Given
    const id = 1
    const emailAddress = 'some@emailAddress.com'
    const username = 'someUsername'
    const account = new Account({ id, emailAddress, username })
    accountRepository.findById.calledWith(id).mockResolvedValue(account)
    // When
    const findedAccount = await accountService.findById(id)
    // Then
    expect(findedAccount).toBeInstanceOf(Account)
    expect(findedAccount.emailAddress).toBe(emailAddress)
    expect(findedAccount.username).toBe(username)
    expect(findedAccount.id).toBe(id)
  }),

  test('findById should throw InvalidEntityIdentifierError when invalid Account id is passed', async () => {
    // Given
    const invalidAccountId = 1;
    // When mocking
    accountRepository.findById.calledWith(invalidAccountId).mockResolvedValue(null)
    // And Calling 
    const accountPromise = accountService.findById(invalidAccountId)
    // Then
    await expect(accountPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('getRoles should throw InvalidEntityIdentifierError when there is no Account with the given id', async () => {
    // Given
    const invalidAccountId = 1
    // When mocking
    accountRepository.findById.calledWith(invalidAccountId).mockResolvedValue(null)
    // And calling 
    const rolesPromise = accountService.getRoles(invalidAccountId)
    // Then
    await expect(rolesPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('getRoles method shoult return Roles when valid Account id is passed', async () => {
    // Given
    const id = 1
    const username = 'someUsername'
    const emailAddress = 'some@email.com'
    const account = new Account( { username, emailAddress })
    const roles = [ 
      new Role({ name: 'someRole' }),
      new Role({ name: 'anotherRole' })
    ]

    // When mocking
    accountRepository.findById.calledWith(id).mockResolvedValue(account)
    accountRepository.loadRoles.calledWith(account).mockResolvedValue(roles)

    // And calling
    const findedRoles = await accountService.getRoles(id)

    // Then
    expect(findedRoles).toBe(roles)
  })
})
