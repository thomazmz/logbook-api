import { getCustomRepository, Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { TypeOrmAccountRepository } from './typeOrmAccountRepository'
import { Account } from '../../../domain'
import { init as setUpDatabase } from '../initializer'

function generateUniqueAccountAttributes() {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    email: `some@email.com_${identifier}` 
  }
}

describe('Account repository tests', () => {

  let databaseConnection: Connection
  let accountRepository: TypeOrmAccountRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    accountRepository = getCustomRepository(TypeOrmAccountRepository)
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

  it('should find account by id', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findById(account.id)

    expect(account.email).toBe(findedAccount.email)
    expect(account.username).toBe(findedAccount.username)
  })

  it('should find account by email', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findOneByEmail(account.email)

    expect(account.username).toBe(findedAccount.username)
  })

  it('should find account by username', async () => {
    const accountAttributes = generateUniqueAccountAttributes()

    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findOneByUsername(account.username)

    expect(account.email).toBe(findedAccount.email)
  })
})