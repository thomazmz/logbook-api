import { Connection } from 'typeorm'
import { generateAccountPartial } from '../../testUtils'
import { typeOrmAccountRepositoryFactory } from './typeOrmAccountRepository'
import { typeOrmRoleRepositoryFactory } from './typeOrmRoleRepository'
import { Account, AccountRepository, Role, RoleRepository } from '../../../domain'
import { init as setUpDatabase } from '../initializer'
import { generateRolePartial } from '../../testUtils'


describe('TypeOrmAccountRepository tests', () => {

  let databaseConnection: Connection
  let accountRepository: AccountRepository
  let roleRepository: RoleRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    accountRepository = typeOrmAccountRepositoryFactory()
    roleRepository = typeOrmRoleRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })
  
  test('save should create account with id attribute', async () => {
    // Given
    const accountAttributes = generateAccountPartial()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    // Then
    expect(account.id != null).toBeTruthy()
  })

  test('findById should find Account instance by id', async () => {
    // Given
    const accountAttributes = generateAccountPartial()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    const findedAccount = await accountRepository.findById(account.id)
    // Then
    expect(account.emailAddress).toBe(findedAccount.emailAddress)
    expect(account.username).toBe(findedAccount.username)
    expect(findedAccount).toBeInstanceOf(Account)
  })

  test('findOneByEmailAddress should find Account instance by email address', async () => {
    // Given
    const accountAttributes = generateAccountPartial()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    const findedAccount = await accountRepository.findOneByEmailAddress(account.emailAddress)
    // Then
    expect(account.username).toBe(findedAccount.username)
    expect(findedAccount).toBeInstanceOf(Account)
  })

  test('findOneByUsername should find Account instance by username', async () => {
    // Given
    const accountAttributes = generateAccountPartial()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    const findedAccount = await accountRepository.findOneByUsername(account.username)
    // Then
    expect(account.emailAddress).toBe(findedAccount.emailAddress)
    expect(findedAccount).toBeInstanceOf(Account)
  })

  test('loadRoles method should return Role entities', async () => {
    // Given some roles
    const someRolePartial = generateRolePartial()
    const anotherRolePartial = generateRolePartial()
    const someRole = await roleRepository.save(new Role(someRolePartial))
    const anotherRole = await roleRepository.save(new Role(anotherRolePartial))
    const roles = [ someRole, anotherRole ]
    // And some account
    const accountPartial = generateAccountPartial()
    const account = await accountRepository.save(new Account({ ...accountPartial, roles }))
    // When
    const findedRoles = await accountRepository.loadRoles(account)
    // Then
    expect(findedRoles).toEqual(roles)
  })
 
  test('loadRoles method should embed roles into Account entity', async () => {
    // Given some roles
    const someRolePartial = generateRolePartial()
    const anotherRolePartial = generateRolePartial()
    const someRole = await roleRepository.save(new Role(someRolePartial))
    const anotherRole = await roleRepository.save(new Role(anotherRolePartial))
    const roles = [ someRole, anotherRole ]
    // And some account
    const accountPartial = generateAccountPartial()
    const account = await accountRepository.save(new Account({ ...accountPartial, roles }))
    // When
    const findedRoles = await accountRepository.loadRoles(account)
    // Then
    expect(account.roles).toEqual(roles)
  })
})