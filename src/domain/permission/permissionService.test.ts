import { mock, MockProxy as Mock } from 'jest-mock-extended'
import { PermissionService, permissionServiceFactory, permissionNames } from './permissionService'
import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

describe('Permission service tests', () => {

  let permissionService: PermissionService
  let permissionRepository: Mock<PermissionRepository>

  beforeEach(async () => {
    permissionRepository = mock<PermissionRepository>()
    permissionService = permissionServiceFactory(permissionRepository)
  })

  it('should return all permissions', async () => {
    // Given
    const permissions = permissionNames.map(name => new Permission({ name }))
    permissionRepository.findOrCreateMany.mockResolvedValue(permissions)
    // When
    const findedPermissions = await permissionService.findAll()
    // Then
    expect(findedPermissions).toBe(permissions)
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