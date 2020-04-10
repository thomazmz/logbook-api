import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '..'
import { Permission, PermissionRepository } from '../../../domain/permission'

describe('Account repository tests', () => {

  let connection: Connection
  let permissionRepository: PermissionRepository

  beforeAll(async () => {
    ({ connection, permissionRepository } = await setUpDatabase())
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should pass', async () => {
    expect(true).toBe(true)
  })
})