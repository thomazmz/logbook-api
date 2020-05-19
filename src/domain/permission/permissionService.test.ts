import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { PermissionService, permissionServiceFactory } from './permissionService'
import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'
import { InvalidEntityIdentifierError } from '../error/invalidEntityIdentifierError'
import { UnavailableEntityIdentifierError } from '../error/unavailableEntityIdentifierError'

describe('permissionService tests', () => {

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

  test('findAll should return all permissions', async () => {
    // Given
    const permissions = permissionNames.map(name => new Permission({ name }))
    // When mocking
    permissionRepository.findOrCreateMany.mockResolvedValue(permissions)
    // And calling
    const findedPermissions = await permissionService.findAll()
    // Then
    expect(findedPermissions).toBe(permissions)
  })

  test('findByName should throw Error when name is considered invalid', async () => {
    // Given
    const name = 'invalidPermissionName'
    // When
    const permissionPromise = permissionService.findByName(name)
    // Then
    expect(permissionPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })  
  
  test('findByName should throw Error when name parameter is undefined', () => {
    // Given
    const name = undefined
    // When 
    const permissionPromise = permissionService.findByName(name)
    // Then
    expect(permissionPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByName should throw Error when name parameter is null', () => {
    // Given
    const name = null
    // When 
    const permissionPromise = permissionService.findByName(name)
    // Then
    expect(permissionPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByName should return Permission entity', async () => {
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

  test('findByName should return expected Permission entity', async () => {
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

  test('findByNames should throw Error if any of the names is invalid', async () => {
    // Given
    const names = [ 'someInvalidPermission' ]
    // When
    const permissionPromise = permissionService.findByNames(names)
    // Then
    expect(permissionPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByNames should return Permission entities', async () => {
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

  test('findByNames should return expected Permission entities', async () => {
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