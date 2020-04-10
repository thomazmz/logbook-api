import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '..'
import { Role, RoleRepository } from '../../../domain/role'

describe('Account repository tests', () => {

  let connection: Connection
  let roleRepository: RoleRepository

  beforeAll(async () => {
    ({ connection, roleRepository } = await setUpDatabase())
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should pass', async () => {
    expect(true).toBe(true)
  })
})