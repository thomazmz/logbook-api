import { Connection} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { init as setUpDatabase } from '../initializer'
import { typeOrmPermissionRepositoryFactory } from './typeOrmPermissionRepository'
import { Permission, PermissionRepository } from '../../../domain'

describe('TypeOrmPermissionRepository tests', () => {

  let databaseConnection: Connection
  let permissionRepository: PermissionRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    permissionRepository = typeOrmPermissionRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  test('findOrCreate should create Permission entity', async () => {
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
    expect(permission).toBeInstanceOf(Permission)
    expect(permission.id).toBe(findedPermission.id)
    expect(permission.name).toBe(findedPermission.name)
  })

  test('findOrCreate should find Permission entity', async () => {
    // Given
    const name = `validPermission_${uuid()}`

    const result = await databaseConnection.createQueryBuilder()
      .insert()
      .into(Permission)
      .values({ name })
      .returning('*')
      .execute()

    // When
    const findedPermission = await databaseConnection.createQueryBuilder()
      .select('permission')
      .from(Permission, 'permission')
      .where('permission.name = :name', { name })
      .getOne()

    const permission = await permissionRepository.findOrCreate({ name })

    // Then
    expect(permission).toBeInstanceOf(Permission)
    expect(permission.id).toBe(findedPermission.id)
    expect(permission.name).toBe(findedPermission.name)
  })

  test('findOrCreateMany should find or create many Permission entities', async () => {
    // Given a array with two valid permissioin names
    const names = [ `someValidPermission_${uuid()}`, `someValidPermission_${uuid()}` ]
    
    // When calling findOrCreateMany with the array as parameter
    const permissions = await permissionRepository.findOrCreateMany(names.map(name => ({ name })))
    
    // Then all values returned by findOrCreateMany should be of type Permission
    expect(permissions[0]).toBeInstanceOf(Permission)
    expect(permissions[1]).toBeInstanceOf(Permission)
  })

  test('findOrCreateMany should find or create many Permission entities', async () => {
    // Given a list with two valid permissioin names
    const names = [ `someValidPermission_${uuid()}`, `someValidPermission_${uuid()}` ]
    
    // When calling findOrCreateMany with the previous mentioned list as parameter
    const permissions = await permissionRepository.findOrCreateMany(names.map(name => ({ name })))
    
    // And performing a T query for all the permissions whose names are on the list
    const findedPermissions = await databaseConnection.createQueryBuilder()
      .select('permission')
      .from(Permission, 'permission')
      .where('permission.name IN (:...names)', { names })
      .getMany()

    // Then all the values returned by findOrCreate many should be equal to the values returned by the query
    expect(permissions[0]).toEqual(findedPermissions[0])
    expect(permissions[1]).toEqual(findedPermissions[1])
  })
})