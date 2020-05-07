import { getCustomRepository, Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { TypeOrmPermissionRepository } from './typeOrmPermissionRepository'
import { Permission } from '../../../domain'

describe('Account repository tests', () => {

  let databaseConnection: Connection
  let permissionRepository: TypeOrmPermissionRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    permissionRepository = getCustomRepository(TypeOrmPermissionRepository)
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  it('should assign id when saving new permission', async () => {
    // Given 
    const name = `somePermission_${uuid()}`
    const permission = new Permission({ name })
    // When
    await permissionRepository.save(permission)
    // Then
    expect(permission.id != null).toBeTruthy()
  })

  it('should find permission by name', async () => {
    // Given 
    const name = `somePermission_${uuid()}`
    const permission = new Permission({ name })
    // When
    await permissionRepository.save(permission)
    const findedPermission = await permissionRepository.findByName(name)
    // Then
    expect(permission.id).toBe(findedPermission.id)
    expect(permission.name).toBe(findedPermission.name)
  })
  
  it('should find or create permission', async () => {
    // Given
    const name = `validPermission_${uuid()}`
    // When
    const permission = await permissionRepository.findOrCreate({ name })
    const findedPermission = await permissionRepository.findOrCreate({ name} )
    // Then
    expect(findedPermission.id).toBe(permission.id)
    expect(findedPermission.name).toBe(permission.name)
  })

  it('should find or create many permissions', async () => {
    // Given
    const names = [ `someValidPermission_${uuid()}`, `anotherValidPermission_${uuid()}` ]
    // When
    const permissions = await permissionRepository.findOrCreateMany(names.map(name => ({ name })))
    const findedPermissions = await Promise.all(names.map(name => permissionRepository.findByName(name)))
    // Then
    expect(permissions[0].id).toBe(findedPermissions[0].id)
    expect(permissions[0].name).toBe(findedPermissions[0].name)
    expect(permissions[1].id).toBe(findedPermissions[1].id)
    expect(permissions[1].name).toBe(findedPermissions[1].name)
  })

  it('should find or create many permissions', async () => {
    // Given
    const names = [ `someValidPermission_${uuid()}`, `anotherValidPermission_${uuid()}` ]
    // When
    const permissions = await permissionRepository.findOrCreateMany(names.map(name => ({ name })))
    const findedPermissions = await Promise.all(names.map(name => permissionRepository.findByName(name)))
    // Then
    expect(permissions[0].id).toBe(findedPermissions[0].id)
    expect(permissions[0].name).toBe(findedPermissions[0].name)
    expect(permissions[1].id).toBe(findedPermissions[1].id)
    expect(permissions[1].name).toBe(findedPermissions[1].name)
  })

  it('should delete permission by permission name', async () => {
    // Given
    const name = `someValidPermission_${uuid()}`
    await permissionRepository.findOrCreate({ name })
    // When
    await permissionRepository.deleteByName(name)
    const permissions = await permissionRepository.findAll()
    // Then
    expect(permissions.some(permission => permission.name == name)).toBeFalsy()
  })
})