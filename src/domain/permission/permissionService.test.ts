import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { PermissionService, permissionServiceFactory } from './permissionService'
import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

describe('Permission service tests', () => {

  let permissionService: PermissionService
  
  let permissionRepository: Mock<PermissionRepository>

  let permissionNames: string[] = [ 
    'someValidPermissionName', 
    'anotherValidPermissionName' 
  ]

  beforeEach(async () => {
    permissionRepository = createMock<PermissionRepository>()
    permissionService = permissionServiceFactory(permissionNames, permissionRepository)
  })

  test('permissionService.findOrCreateMany should return all permissions', async () => {
    // Given
    const permissions = permissionNames.map(name => new Permission({ name }))
    // When mocking
    permissionRepository.findOrCreateMany.mockResolvedValue(permissions)
    // And calling
    const findedPermissions = await permissionService.findAll()
    // Then
    expect(findedPermissions).toBe(permissions)
  })

  test('permissionService.findByName should throw Error when name is considered invalid', async () => {
    // Given
    const name = 'invalidPermission'
    // When
    const permissionPromise = permissionService.findByName(name)
    // Then
    expect(permissionPromise).rejects.toThrow(Error)
  })

  test('permissionService.findByName should return Permission entity', async () => {
    // Given
    const name = 'someValidPermissionName'
    const permission = new Permission({ name })
    // When mocking
    permissionRepository.findOrCreate.mockResolvedValue(permission)
    // And calling
    const findedPermission = await permissionService.findByName(name)
    // Then
    expect(findedPermission).toBeInstanceOf(Permission)
  })

  test('permissionService.findByName should return expected Permission entity', async () => {
    // Given
    const id = 1 
    const name = 'someValidPermissionName'
    const permission = new Permission({ id, name })
    // When mocking
    permissionRepository.findOrCreate.mockResolvedValue(permission)
    // And calling
    const findedPermission = await permissionService.findByName(name)
    // Then
    expect(findedPermission).toEqual(permission)
  })

  test('permissionService.findByNames should throw Error if any of the names is invalid', async () => {
    // Given
    const names = [ 'someInvalidPermission' ]
    // When
    const permissionPromise = permissionService.findByNames(names)
    // Then
    expect(permissionPromise).rejects.toThrow(Error)
  })

  test('permissionService.findByNames should return Permission entities', async () => {
    // Given
    const names = [ 'someValidPermissionName', 'anotherValidPermissionName' ]
    const permissions = names.map((name, index) => new Permission({ id: index+1, name }))
    // When mocking
    permissionRepository.findOrCreate
      .mockResolvedValueOnce(permissions[0])
      .mockResolvedValueOnce(permissions[1])
    // And calling
    const findedPermissions = await permissionService.findByNames(names)
    // Then
    expect(findedPermissions[0]).toBeInstanceOf(Permission)
    expect(findedPermissions[1]).toBeInstanceOf(Permission)
  })

  test('permissionService.findByNames should return expecrted Permission entities', async () => {
    // Given
    const names = [ 'someValidPermissionName', 'anotherValidPermissionName' ]
    const permissions = names.map((name, index) => new Permission({ id: index+1, name }))
    // When mocking
    permissionRepository.findOrCreate
      .mockResolvedValueOnce(permissions[0])
      .mockResolvedValueOnce(permissions[1])
    // And calling
    const findedPermissions = await permissionService.findByNames(names)
    // Then
    expect(findedPermissions).toEqual(permissions)
  })
})