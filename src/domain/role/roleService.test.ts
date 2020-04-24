import { mock, MockProxy as Mock } from 'jest-mock-extended'
import { RoleService, roleServiceFactory } from './roleService'
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
    const createdRole = await roleService.create(name)
    // Then
    expect(createdRole).toBe(role)
  })

  it('should return appropriate error message if name is already in use', async () => {
    // Given
    const name = 'someRole'
    const role = new Role({ name })
    // When
    roleRepository.findByName.mockResolvedValue(role)
    // Then
    await expect(roleService.create(name)).rejects.toThrow('Permission name already in use.')
  })
})