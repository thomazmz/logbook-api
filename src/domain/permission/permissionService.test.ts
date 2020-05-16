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


  // it('should return null if permission name is invlalid', async () => {
  //   // Given
  //   const name = 'invalidPermissionName'
  //   // When
  //   const findedPermission = await permissionService.findByName(name)
  //   // Then
  //   expect(permissionNames.includes(name)).toBeFalsy()
  //   expect(findedPermission).toBe(null)
  // })

  // it('should return Permission entity by name', async () => {
  //   // Given
  //   const name = permissionNames[0]
  //   const permission = new Permission({ name })
  //   permissionRepository.findOrCreate.mockResolvedValue(permission)
  //   // When
  //   const findedPermission = await permissionService.findByName(name)
  //   // Then
  //   expect(findedPermission).toBeInstanceOf(Permission)
  //   expect(findedPermission).toBe(permission)
  // })
})