import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { RoleService, roleServiceFactory } from './roleService'
import { RoleRepository } from './roleRepository'
import { PermissionService } from '../permission/permissionService'
import { Permission } from '../permission/permission'
import { Role } from './role'

describe('roleService tests', () => {

  let roleService: RoleService
  let roleRepository: Mock<RoleRepository>
  let permissionService: Mock<PermissionService>

  beforeEach(async () => {
    roleRepository = createMock<RoleRepository>()
    permissionService = createMock<PermissionService>()
    roleService = roleServiceFactory(roleRepository, permissionService)
  })

  test('create method should return saved Role entity', async () => {
    // Given
    const id = 1
    const name = 'someRole'
    const rolepartial = { name }
    const savedRole = new Role({ id, name })
    // When mocking
    roleRepository.save.mockResolvedValue(savedRole)
    // And calling
    const createdRole = await roleService.create(rolepartial)
    // Then
    expect(createdRole).toBeInstanceOf(Role)
    expect(createdRole).toBe(savedRole)
  })

  // FIX ME - Triggering Jest UnhandledPromiseRejectionWarning
  test('create method should throw Error if Role name is already in use', async () => {
    // Given
    const name = 'someRole'
    const rolepartial = { name }
    const role = new Role(rolepartial)
    // When
    roleRepository.findByName.mockResolvedValue(role)
    const rolePromise = roleService.create(rolepartial)
    // Then
    expect(rolePromise).rejects.toThrow(Error)
  })

  test('findById method should find Role entity when valid Role id is passed', async () => {
    // Given
    const id = 1;
    const name = 'someRole'
    const role = new Role({ id, name })
    // When
    roleRepository.findById.calledWith(id).mockResolvedValue(role)
    const findedRole = await roleService.findById(id)
    // Then
    expect(findedRole).toBeInstanceOf(Role)
    expect(findedRole).toBe(role)
  })

  test('findById method should throw Error when invalid Role id is passed', async () => {
    // Given
    const invalidRoleId = 1;
    // When
    roleRepository.findById.calledWith(invalidRoleId).mockResolvedValue(null)
    // Then
    expect(roleService.findById(invalidRoleId)).rejects.toThrow(Error)
  })

  test('getPermissions method shoult return Permissions when valid Role id is passed', async () => {
    // Given
    const id = 1
    const name = 'someRole'
    const permissions = [ 
      new Permission({ name: 'readSomething' }),
      new Permission({ name: 'writeSomething' })
    ]
    const role = new Role({ id, name, permissions })
    // When
    roleRepository.findById.calledWith(id).mockResolvedValue(role)
    const findedPermissions = await roleService.getPermissions(id)
    // Then
    expect(findedPermissions).toBe(permissions)
  })

  test('getPermissions method should throw Error when there is no Role with the given id', async () => {
    // Given
    const invalidRoleId = 1
    // When mocking
    roleRepository.findById.calledWith(invalidRoleId).mockResolvedValue(null)
    // Then
    expect(roleService.getPermissions(invalidRoleId)).rejects.toThrow(Error)
  })
  
  test('updatePermissions should return updated Role entity', async () => {
    // Given
    const validRoleId = 1
    const someValidPermissionName = 'someValidPermissionName'
    const anotherValidPermissionName = 'anotherValidPermissionName'
  
    const rolepartial = {
      id: validRoleId,
      permissions: [
        { name: someValidPermissionName },
        { name: anotherValidPermissionName }
      ]
    }

    const someValidPermission = new Permission({ id: 1, name: someValidPermissionName })
    const anotherValidPermission = new Permission({ id: 2, name: anotherValidPermissionName })
    
    const findedRole = new Role({ id: validRoleId })
    const updatedRole = Object.assign(findedRole, { permissions:  [ someValidPermission, anotherValidPermission ]})

    // When mocking
    permissionService.findByName.calledWith(someValidPermissionName).mockResolvedValue(someValidPermission)
    permissionService.findByName.calledWith(anotherValidPermissionName).mockResolvedValue(anotherValidPermission)
    roleRepository.findById.calledWith(validRoleId).mockResolvedValue(findedRole)
    roleRepository.save.calledWith(updatedRole).mockResolvedValue(updatedRole)

    // And calling
    const returnedUpdatedRole = await roleService.updatePermissions(rolepartial)

    // Then 
    expect(returnedUpdatedRole).toBeInstanceOf(Role)
    expect(returnedUpdatedRole).toBe(updatedRole)
  })

  test('updatePermissions should throw Error when invalid rolePartial.id is passed', async () => {
    // Given
    const invalidRoleId = 1
    const rolepartial = {
      id: invalidRoleId
    }
    // When mocking
    roleRepository.findById.calledWith(invalidRoleId).mockResolvedValue(null)
    // And calling
    const updatePremissionsPromise = roleService.updatePermissions(rolepartial)
    // Then
    expect(updatePremissionsPromise).rejects.toThrow(Error)
  })

  test('updatePermissions should throw Error when any invalid permissionPartial.name is passed', async () => {
    // Given
    const validRoleId = 1
    const validPermissionName = 'validPermissionName'
    const invalidPermissionName = 'invalidPermissionName'
    const rolePartial = {
      id: validRoleId,
      permissions: [
        { name: validPermissionName },
        { name: invalidPermissionName }
      ]
    }
    // When mocking
    roleRepository.findById.mockResolvedValue(new Role({ }))
    permissionService.findByNames.mockRejectedValue(Error('Some Error'))
    // And calling
    const updatedRolePromisse = roleService.updatePermissions(rolePartial)
    // Then 
    expect(updatedRolePromisse).rejects.toThrow(Error)
  })
})