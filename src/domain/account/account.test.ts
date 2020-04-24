import jwtDecoder from 'jwt-decode'
import { Account } from './account'

describe('Account tests', () => {

  it('Should hash account password', async () => {
    // Given
    const passwordLiteral = 'password'
    const account = new Account({})
    // When
    await account.setPasswordHash(passwordLiteral)
    // Then
    expect(account.passwordHash).not.toBe(passwordLiteral)
  });

  it('Should verify user password', async () => {
    // Given
    const passwordLiteral = 'password'
    const account = new Account({})
    // When
    await account.setPasswordHash(passwordLiteral)
    // Then
    expect(account.checkPassword(passwordLiteral)).toBeTruthy()
    expect(account.checkPassword(`!${passwordLiteral}`)).toBeTruthy()
  })

  it('Should generate JWT with user payload', async () => {
    // Given
    const account = new Account({ id: 1 })
    const jwt = await account.generateJwt()
    // When
    const jwtDecoded = jwtDecoder(jwt)
    // Then
    expect(jwtDecoded.id).toBe(account.id);
  })
})