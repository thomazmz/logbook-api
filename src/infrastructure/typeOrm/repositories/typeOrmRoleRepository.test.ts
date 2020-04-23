import { getCustomRepository } from 'typeorm'
import { init as setUpDatabase } from '../initializer'
import { TypeOrmRoleRepository } from './typeOrmRoleRepository'

describe('Account repository tests', () => {

  let disconectDatabase: Function
  let roleRepository: TypeOrmRoleRepository

  beforeAll(async () => {
    disconectDatabase = await setUpDatabase()
    roleRepository = getCustomRepository(TypeOrmRoleRepository)
  })

  afterAll(async () => {
    await disconectDatabase()
  })

  it('should pass', async () => {
    expect(true).toBe(true)
  })
})