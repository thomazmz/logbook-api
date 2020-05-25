import { Connection} from 'typeorm'
import { init as setUpDatabase } from '../initializer'
import { typeOrmRoleRepositoryFactory } from './typeOrmRoleRepository'
import { Role, RoleRepository, AuthorizationRepository } from '../../../domain'
import { typeOrmAuthorizationRepositoryFactory } from './typeOrmAuthorizationRepository'
import { generateRolePartial, generateAuthorizationPartial } from '../testUtils'

describe('TypeOrmRoleRepository tests', () => {

  let databaseConnection: Connection
  let roleRepository: RoleRepository
  let authorizationRepository: AuthorizationRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    roleRepository = typeOrmRoleRepositoryFactory()
    authorizationRepository = typeOrmAuthorizationRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  test('findByName method should find Role entity', async () => {
    // Given 
    const rolePartial = generateRolePartial()
    const role = new Role(rolePartial)
    // When
    await roleRepository.save(role)
    const findedRole = await roleRepository.findByName(rolePartial.name)
    // Then
    expect(role.id).toBe(findedRole.id)
    expect(role.name).toBe(findedRole.name)
    expect(role instanceof Role).toBeTruthy()
  })

  test('loadAuthorizations method should return Authorization entities', async () => {
    // Given some authorization
    const someAuthorizationPartial = generateAuthorizationPartial()
    const anotherAuthorizationPartial = generateAuthorizationPartial()
    const someAuthorization = await authorizationRepository.findOrCreate(someAuthorizationPartial)
    const anotherAuthorization = await authorizationRepository.findOrCreate(anotherAuthorizationPartial)
    // And some role
    const rolePartial = generateRolePartial()
    const authorizations = [ someAuthorization, anotherAuthorization ]
    const role = await roleRepository.save(new Role({ ...rolePartial, authorizations }))
    // When
    const findedAuthorizations = await roleRepository.loadAuthorizations(role)
    // Then
    expect(findedAuthorizations).toEqual(authorizations)
  })
 
  test('Authorizations method should embed authorizations into Role entity', async () => {
    // Given some authorizations
    const someAuthorizationPartial = generateAuthorizationPartial()
    const anotherAuthorizationPartial = generateAuthorizationPartial()
    const someAuthorization = await authorizationRepository.findOrCreate(someAuthorizationPartial)
    const anotherAuthorization = await authorizationRepository.findOrCreate(anotherAuthorizationPartial)
    // And some role
    const rolePartial = generateRolePartial()
    const authorizations = [ someAuthorization, anotherAuthorization ]
    const role = await roleRepository.save(new Role({ ...rolePartial, authorizations }))
    // When
    await roleRepository.loadAuthorizations(role)
    // Then
    expect(role.authorizations).toEqual(authorizations)
  })
})