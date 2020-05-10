import { mock, MockProxy as Mock } from 'jest-mock-extended'
import { RoleService, roleServiceFactory } from './roleService'
import { PermissionRepository } from '../permission/permissionRepository'
import { RoleRepository } from './roleRepository'
import { Role } from './role'

describe('Role service tests', () => {

  let roleService: RoleService
  let roleRepository: Mock<RoleRepository>

  beforeEach(async () => {
    roleRepository = mock<RoleRepository>()
    roleService = roleServiceFactory(roleRepository)
  })

  it('should return created role', async () => {
    // Given
    const name = 'someRole'
    const role = new Role({ name })
    // When
    roleRepository.save.mockResolvedValue(role)
    const createdRole = await roleService.create(role)
    // Then
    expect(createdRole).toBe(role)
  })

  it('should call repository method to persist Role', async () => {
    // Given
    const name = 'someRole'
    const role = new Role({ name })
    // When
    roleRepository.save.mockResolvedValue(role)
    const createdRole = await roleService.create(role)
    // Then
    expect(roleRepository.save).toHaveBeenCalled()
  })

  it('should throw error if name is already in use', async () => {
    // Given
    const name = 'someRole'
    const role = new Role({ name })
    // When
    roleRepository.findByName.mockResolvedValue(role)
    // Then
    await expect(roleService.create(role)).rejects.toThrow('Role name already in use.')
  })
})