import jwtDecoder from 'jwt-decode'
import { Account } from './account'

describe('Account tests', () => {

  it('Should hash account password', async () => {
    const passwordLiteral = 'password'
    const account = new Account({})

    await account.setPasswordHash(passwordLiteral)

    expect(account.passwordHash).not.toBe(passwordLiteral)
  });

  it('Should verify user password', async () => {
    const passwordLiteral = 'password'
    const account = new Account({})

    await account.setPasswordHash(passwordLiteral)

    expect(account.checkPassword(passwordLiteral)).toBeTruthy()
    expect(account.checkPassword(`!${passwordLiteral}`)).toBeTruthy()
  })

  it('Should generate JWT with user payload', async () => {
    const account = new Account({ id: 1 })

    const jwt = await account.generateJwt()
    const jwtDecoded = jwtDecoder(jwt)

    expect(jwtDecoded.id).toBe(account.id);
  })
})