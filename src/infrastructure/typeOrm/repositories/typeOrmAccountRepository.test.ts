import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { typeOrmAccountRepositoryFactory } from './typeOrmAccountRepository'
import { Account, AccountRepository } from '../../../domain'
import { init as setUpDatabase } from '../initializer'

function generateUniqueAccountAttributes() {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    email: `some@email.com_${identifier}` 
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
  
  it('should create account with id attribute', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)

    expect(account.id != null).toBeTruthy()
  })

  it('should find Account instance by id', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findById(account.id)

    expect(account.email).toBe(findedAccount.email)
    expect(account.username).toBe(findedAccount.username)
    expect(findedAccount instanceof Account).toBeTruthy()
  })

  it('should find Account instance by email', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findOneByEmail(account.email)

    expect(account.username).toBe(findedAccount.username)
    expect(findedAccount instanceof Account).toBeTruthy()
  })

  it('should find account by username', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findOneByUsername(account.username)

    expect(account.email).toBe(findedAccount.email)
    expect(findedAccount instanceof Account).toBeTruthy()
  })
})