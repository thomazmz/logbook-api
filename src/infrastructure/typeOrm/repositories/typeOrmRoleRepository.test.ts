import { Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { typeOrmRoleRepositoryFactory } from './typeOrmRoleRepository'
import { Role, RoleRepository } from '../../../domain'

describe('TypeOrmRoleRepository tests', () => {

  let databaseConnection: Connection
  let roleRepository: RoleRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    roleRepository = typeOrmRoleRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  it('should find Role entity by name', async () => {
    // Given 
    const name = `someRole_${uuid()}`
    const role = new Role({ name })
    // When
    await roleRepository.save(role)
    const findedRole = await roleRepository.findByName(name)
    // Then
    expect(role.id).toBe(findedRole.id)
    expect(role.name).toBe(findedRole.name)
    expect(role instanceof Role).toBeTruthy()
  })
})