import { Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { typeOrmPermissionRepositoryFactory } from './typeOrmPermissionRepository'
import { Permission, PermissionRepository } from '../../../domain'

describe('Permission repository tests', () => {

  let databaseConnection: Connection
  let permissionRepository: PermissionRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    permissionRepository = typeOrmPermissionRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  it('should find or create permission', async () => {
    // Given
    const name = `validPermission_${uuid()}`
    
    // When
    const permission = await permissionRepository.findOrCreate({ name })
    const findedPermission = await databaseConnection.createQueryBuilder()
      .select('permission')
      .from(Permission, 'permission')
      .where('permission.id = :id', { id: permission.id })
      .getOne()
    
    // Then
    expect(findedPermission.id).toBe(permission.id)
    expect(findedPermission.name).toBe(permission.name)
  })

  it('should find or create many permissions', async () => {
    // Given
    const names = [ `someValidPermission_${uuid()}`, `anotherValidPermission_${uuid()}` ]
    
    // When
    const permissions = await permissionRepository.findOrCreateMany(names.map(name => ({ name })))
    const findedPermissions = await databaseConnection.createQueryBuilder()
      .select('permission')
      .from(Permission, 'permission')
      .where('permission.name IN (:...names)', { names })
      .getMany()
    
    // Then
    expect(permissions[0].id).toBe(findedPermissions[0].id)
    expect(permissions[0].name).toBe(findedPermissions[0].name)
    expect(permissions[0] instanceof Permission).toBeTruthy()
    expect(permissions[1].id).toBe(findedPermissions[1].id)
    expect(permissions[1].name).toBe(findedPermissions[1].name)
    expect(permissions[1] instanceof Permission).toBeTruthy()
  })
})