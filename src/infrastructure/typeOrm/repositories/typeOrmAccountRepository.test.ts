import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { typeOrmAccountRepositoryFactory } from './typeOrmAccountRepository'
import { Account, AccountRepository } from '../../../domain'
import { init as setUpDatabase } from '../initializer'

function generateUniqueAccountAttributes() {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    emailAddress: `some@emailaddress.com_${identifier}` 
  }
}

describe('TypeOrmAccountRepository tests', () => {

  let databaseConnection: Connection
  let accountRepository: AccountRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    accountRepository = typeOrmAccountRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })
  
  test('save should create account with id attribute', async () => {
    // Given
    const accountAttributes = generateUniqueAccountAttributes()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    // Then
    expect(account.id != null).toBeTruthy()
  })

  test('findById should find Account instance by id', async () => {
    // Given
    const accountAttributes = generateUniqueAccountAttributes()
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
    const accountAttributes = generateUniqueAccountAttributes()
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
    const accountAttributes = generateUniqueAccountAttributes()
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // When
    const findedAccount = await accountRepository.findOneByUsername(account.username)
    // Then
    expect(account.emailAddress).toBe(findedAccount.emailAddress)
    expect(findedAccount).toBeInstanceOf(Account)
  })
})