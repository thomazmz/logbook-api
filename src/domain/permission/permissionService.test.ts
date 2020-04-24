import { mock, MockProxy as Mock } from 'jest-mock-extended'
import { PermissionService, permissionServiceFactory } from './permissionService'
import { PermissionRepository } from './permissionRepository'
import { Permission } from './permission'

describe('Permission service tests', () => {

  let permissionService: PermissionService
  let permissionRepository: Mock<PermissionRepository>

  beforeEach(async () => {
    permissionRepository = mock<PermissionRepository>()
    permissionService = permissionServiceFactory(permissionRepository)
  })

  it('should return created permission', async () => {
    // Given
    const name = 'somePermission'
    const permission = new Permission({ name })
    // When
    permissionRepository.save.mockResolvedValue(permission)
    const createdPermission = await permissionService.create(name)
    // Then
    expect(createdPermission).toBe(permission)
  })

  it('should return appropriate error message if email is already in use', async () => {
    // Given
    const name = 'somePermission'
    const permission = new Permission({ name })
    // When
    permissionRepository.findByName.mockResolvedValue(permission)
    // Then
    await expect(permissionService.create(name)).rejects.toThrow('Name already in use.')
  })
})