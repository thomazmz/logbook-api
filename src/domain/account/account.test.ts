import jwtDecoder from 'jwt-decode'
import { Account } from './account'

describe('Account tests', () => {

  test('setPasswordHash should hash password', async () => {
    // Given
    const passwordLiteral = 'password'
    const account = new Account({})
    // When
    await account.setPasswordHash(passwordLiteral)
    // Then
    expect(account.passwordHash).not.toBe(passwordLiteral)
  })

  test('checkPassword should return false if user passwordHash is not defined', async () => {
    // Given
    const password = 'password'
    const account = new Account({})
    // When
    const passwordCheck = await account.checkPassword(password)
    // Then
    expect(passwordCheck).toBeFalsy()
  })

  test('checkPassword should verify invalid password', async () => {
    // Given
    const password = 'password'
    const account = new Account({})
    await account.setPasswordHash(password)
    // When
    const passwordCheck = await account.checkPassword(`!${password}`)
    // Then
    expect(passwordCheck).toBeFalsy()
  })

  test('checkPassword should verify valid password', async () => {
    // Given
    const password = 'password'
    const account = new Account({})
    await account.setPasswordHash(password)
    // When
    const passwordCheck = await account.checkPassword(password)
    // Then
    expect(passwordCheck).toBeTruthy()
  })

  test('generateJwt should generate Json Web Token with payload', async () => {
    // Given
    const account = new Account({ id: 1 })
    const jwt = await account.generateJwt()
    // When
    const jwtDecoded = jwtDecoder(jwt)
    // Then
    expect(jwtDecoded.iat).toBeTruthy();
    expect(jwtDecoded.id).toBe(account.id);
  })

  test('verifyToken should verify token', async () => {
    // Given
    const account = new Account({ id: 111 })
    const token = await account.generateJwt()
    // When
    const verifiedToken = await account.verifyJwt(token)
    // Then
    expect(verifiedToken.id).toBe(account.id)
  })

  test('verifyToken should throw error when invalid token is passed', async () => {
    // Given
    const account = new Account({ id: 111 })
    const token = 'invalidTokenString'
    // When
    const verifiedTokenPromise = account.verifyJwt(token)
    // Then
    expect(verifiedTokenPromise).rejects.toThrow(Error)
  })
})