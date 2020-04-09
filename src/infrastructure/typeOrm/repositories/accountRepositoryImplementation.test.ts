import { v4 as uuid } from 'uuid'
import { Connection } from 'typeorm'
import { init as setUpDatabase } from '..'
import { Account, AccountRepository } from '../../../domain/account'

function getAccountAttributes() {
  const identifier = uuid()
  return {
    username: `username_${identifier}`,
    email: `some@email.com_${identifier}`,
    passwordLiteral: `password_${identifier}`
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
    const { username, email } = getAccountAttributes()
    // When
    const account = new Account(username, email)
    await accountRepository.save(account)
    // Then
    expect(account.id != null).toBeTruthy()
  })
})