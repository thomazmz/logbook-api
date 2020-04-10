import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '..'
import { Account, AccountRepository } from '../../../domain/account'

function generateUniqueAccountAttributes() {
  const identifier = uuid()
  return {
    username: `username_${identifier}`,
    email: `some@email.com_${identifier}`,
  }
}

describe('Account repository tests', () => {

  let connection: Connection
  let accountRepository: AccountRepository

  beforeAll(async () => {
    ({ connection, accountRepository } = await setUpDatabase())
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  
  it('should create account with id attribute', async () => {
    // Given
    const accountAttributes = generateUniqueAccountAttributes()
    // When
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    // Then
    expect(account.id != null).toBeTruthy()
  })

  it('should find account by id', async () => {
    // Given
    const accountAttributes = generateUniqueAccountAttributes()
    // When
    const account = new Account(accountAttributes)
    await accountRepository.save(account)
    const findedAccount = await accountRepository.findById(account.id)
    // Then
    expect(account.email).toBe(findedAccount.email)
    expect(account.username).toBe(findedAccount.username)
  })
})