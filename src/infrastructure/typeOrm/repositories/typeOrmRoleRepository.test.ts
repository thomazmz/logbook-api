import { Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { typeOrmRoleRepositoryFactory } from './typeOrmRoleRepository'
import { Role, RoleRepository, PermissionRepository } from '../../../domain'
import { typeOrmPermissionRepositoryFactory } from './typeOrmPermissionRepository'

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

  test('loadPermissions method should return Permission entities', async () => {
    // Given some permissions
    const somePermissionName = `somePermission_${uuid()}`
    const anotherPermissionName = `somePermission_${uuid()}`
    const somePermission = await permissionRepository.findOrCreate({ name: somePermissionName })
    const anotherPermission = await permissionRepository.findOrCreate({ name: anotherPermissionName })
    // And some role
    const name = `role_${uuid()}`
    const permissions = [ somePermission, anotherPermission ]
    const role = await roleRepository.save(new Role({ name, permissions }))
    // When
    const findedPermissions = await roleRepository.loadPermissions(role)
    // Then
    expect(findedPermissions).toEqual(permissions)
  })
 
  test('loadPermissions method should embed permissions into Role entity', async () => {
    // Given some permissions
    const somePermissionName = `somePermission_${uuid()}`
    const anotherPermissionName = `anotherPermission_${uuid()}`
    const somePermission = await permissionRepository.findOrCreate({ name: somePermissionName })
    const anotherPermission = await permissionRepository.findOrCreate({ name: anotherPermissionName })
    // And some role
    const name = `role_${uuid()}`
    const permissions = [ somePermission, anotherPermission ]
    const role = await roleRepository.save(new Role({ name, permissions }))
    // When
    await roleRepository.loadPermissions(role)
    // Then
    expect(role.permissions).toEqual(permissions)
  })
})