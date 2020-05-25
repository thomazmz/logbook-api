import { Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { typeOrmRoleRepositoryFactory } from './typeOrmRoleRepository'
import { Role, RoleRepository, PermissionRepository } from '../../../domain'
import { typeOrmPermissionRepositoryFactory } from './typeOrmPermissionRepository'
import { generateRolePartial, generatePermissionPartial } from './testUtils'

describe('TypeOrmRoleRepository tests', () => {

  let databaseConnection: Connection
  let roleRepository: RoleRepository
  let permissionRepository: PermissionRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    roleRepository = typeOrmRoleRepositoryFactory()
    permissionRepository = typeOrmPermissionRepositoryFactory()
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

  test('loadPermissions method should return Permission entities', async () => {
    // Given some permissions
    const somePermissionPartial = generatePermissionPartial()
    const anotherPermissionPartial = generatePermissionPartial()
    const somePermission = await permissionRepository.findOrCreate(somePermissionPartial)
    const anotherPermission = await permissionRepository.findOrCreate(anotherPermissionPartial)
    // And some role
    const rolePartial = generateRolePartial()
    const permissions = [ somePermission, anotherPermission ]
    const role = await roleRepository.save(new Role({ ...rolePartial, permissions }))
    // When
    const findedPermissions = await roleRepository.loadPermissions(role)
    // Then
    expect(findedPermissions).toEqual(permissions)
  })
 
  test('loadPermissions method should embed permissions into Role entity', async () => {
    // Given some permissions
    const somePermissionPartial = generatePermissionPartial()
    const anotherPermissionPartial = generatePermissionPartial()
    const somePermission = await permissionRepository.findOrCreate(somePermissionPartial)
    const anotherPermission = await permissionRepository.findOrCreate(anotherPermissionPartial)
    // And some role
    const rolePartial = generateRolePartial()
    const permissions = [ somePermission, anotherPermission ]
    const role = await roleRepository.save(new Role({ ...rolePartial, permissions }))
    // When
    await roleRepository.loadPermissions(role)
    // Then
    expect(role.permissions).toEqual(permissions)
  })
})