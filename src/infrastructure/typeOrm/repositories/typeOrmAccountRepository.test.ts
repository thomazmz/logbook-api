import { getCustomRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Account } from '../../../domain'
import { init as setUpDatabase } from '..'
import { TypeOrmAccountRepository } from './typeOrmAccountRepository'

function generateUniqueAccountAttributes() {
  const identifier = uuid()
  return { 
    username: `username_${identifier}`, 
    email: `some@email.com_${identifier}` 
  }
}

describe('Account repository tests', () => {

  let disconectDatabase: Function
  let accountRepository: TypeOrmAccountRepository

  beforeAll(async () => {
    disconectDatabase = await setUpDatabase()
    accountRepository = getCustomRepository(TypeOrmAccountRepository)
  })

  afterAll(async () => {
    await disconectDatabase()
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
    const findedAccount = await accountRepository.findOneByEmail(account.username)

    expect(account.email).toBe(findedAccount.email)
  })
})