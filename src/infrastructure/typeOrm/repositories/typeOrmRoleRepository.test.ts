import { getCustomRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { TypeOrmRoleRepository } from './typeOrmRoleRepository'
import { Role } from '../../../domain'

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

  it('should assign id when saving new role', async () => {
    // Given 
    const name = `someRole_${uuid()}`
    const role = new Role({ name })
    // When
    await roleRepository.save(role)
    // Then
    expect(role.id != null).toBeTruthy()
  })

  it('should find role by name', async () => {
    // Given 
    const name = `someRole_${uuid()}`
    const role = new Role({ name })
    // When
    await roleRepository.save(role)
    const findedRole = await roleRepository.findByName(name)
    // Then
    expect(role.id).toBe(findedRole.id)
    expect(role.name).toBe(findedRole.name)
  })
})