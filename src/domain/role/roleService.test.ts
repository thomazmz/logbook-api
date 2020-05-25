import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { InvalidEntityIdentifierError } from '../error/invalidEntityIdentifierError'
import { RoleService, roleServiceFactory } from './roleService'
import { RoleRepository } from './roleRepository'
import { AuthorizationService } from '../authorization/authorizationService'
import { Authorization } from '../authorization/authorization'
import { Role } from './role'
import { create } from 'domain'

describe('roleService tests', () => {

  let roleService: RoleService
  let roleRepository: Mock<RoleRepository>
  let authorizationService: Mock<AuthorizationService>

  beforeEach(async () => {
    roleRepository = createMock<RoleRepository>()
    authorizationService = createMock<AuthorizationService>()
    roleService = roleServiceFactory(roleRepository, authorizationService)
  })

  test('findAll method should return all Roles in role repository', async () => {
    // Given
    const someRole = new Role({name: 'someRole'})
    const anotherRole = new Role({ name: 'anotherRole' })
    // When mocking
    const mockedRoles = [ someRole, anotherRole ]
    roleRepository.findAll.mockResolvedValue(mockedRoles)
    // And calling
    const findedRoles = await roleService.findAll()
    // Then
    expect(findedRoles).toBe(mockedRoles)
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

  test('create method should throw Error if Role name is already in use', async () => {
    // Given
    const name = 'someRole'
    const rolepartial = { name }
    const role = new Role(rolepartial)
    // When mocking
    roleRepository.findByName.mockResolvedValue(role)
    // And calling
    const rolePromise = roleService.create(rolepartial)
    // Then
    expect(rolePromise).rejects.toThrow(Error)
  })

  test('findById method should find Role entity when valid Role id is passed', async () => {
    // Given
    const id = 1;
    const name = 'someRole'
    const role = new Role({ id, name })
    // When mockings
    roleRepository.findById.calledWith(id).mockResolvedValue(role)
    // And calling
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

  test('update method should update name', async () => {
    // Given
    const role = new Role({ 
      id: 1,
      name: 'anotherRoleName '
    })
    const rolePartial = {
      id: 1,
      name: 'someRoleName'
    }

    // When mocking 
    roleRepository.findById.calledWith(rolePartial.id).mockResolvedValue(role)
    roleRepository.save.calledWith(Object.assign(role, rolePartial)).mockResolvedValue(role)

    // And calling
    const updatedRole = await roleService.update(rolePartial)

    // Then
    expect(updatedRole.id).toBe(rolePartial.id)
    expect(updatedRole.name).toBe(rolePartial.name)
  })

  test('update method should update name', async () => {
    // Given
    const role = new Role({ 
      id: 1,
      name: 'anotherRoleName '
    })
    const rolePartial = {
      id: 1,
      name: 'someRoleName'
    }

    // When mocking 
    roleRepository.findById.calledWith(rolePartial.id).mockResolvedValue(role)
    roleRepository.save.mockImplementation(r => Promise.resolve(r))

    // And calling
    const updatedRole = await roleService.update(rolePartial)

    // Then
    expect(updatedRole.id).toBe(rolePartial.id)
    expect(updatedRole.name).toBe(rolePartial.name)
  })

  test('update method should have no effect if role partial has no attributes', async () => {
    // Given
    const role = new Role({ 
      id: 1,
      name: 'anotherRoleName '
    })
    const rolePartial = {
      id: 1
    }

    // When mocking 
    roleRepository.findById.calledWith(rolePartial.id).mockResolvedValue(role)
    roleRepository.save.mockImplementation(r => Promise.resolve(r))

    // And calling
    const updatedRole = await roleService.update(rolePartial)

    // Then
    expect(updatedRole.id).toBe(role.id)
    expect(updatedRole.name).toBe(role.name)
  })

  test('getAuthorizations method shoult return Authorizations when valid Role id is passed', async () => {
    // Given
    const id = 1
    const name = 'someRole'
    const role = new Role({ id, name })
    const authorizations = [ 
      new Authorization({ name: 'readSomething' }),
      new Authorization({ name: 'writeSomething' })
    ]

    // When mocking
    roleRepository.findById.calledWith(id).mockResolvedValue(role)
    roleRepository.loadAuthorizations.calledWith(role).mockResolvedValue(authorizations)

    // And calling
    const findedAuthorizations = await roleService.getAuthorizations(id)

    // Then
    expect(findedAuthorizations).toBe(authorizations)
  })

  test('getAuthorizations method should throw Error when there is no Role with the given id', async () => {
    // Given
    const invalidRoleId = 1
    // When mocking
    roleRepository.findById.calledWith(invalidRoleId).mockResolvedValue(null)
    // And calling 
    const authorizationsPromise = roleService.getAuthorizations(invalidRoleId)
    // Then
    expect(authorizationsPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })
  
  test('updateAuthorizations should return updated Role entity', async () => {
    // Given
    const validRoleId = 1
    const someValidAuthorizationName = 'someValidAuthorizationName'
    const anotherValidAuthorizationName = 'anotherValidAuthorizationName'
  
    const rolepartial = {
      id: validRoleId,
      authorizations: [
        { name: someValidAuthorizationName },
        { name: anotherValidAuthorizationName }
      ]
    }

    const someValidAuthorization = new Authorization({ id: 1, name: someValidAuthorizationName })
    const anotherValidAuthorization = new Authorization({ id: 2, name: anotherValidAuthorizationName })
    
    const findedRole = new Role({ id: validRoleId })
    const updatedRole = Object.assign(findedRole, { authorizations:  [ someValidAuthorization, anotherValidAuthorization ]})

    // When mocking
    authorizationService.findByName.calledWith(someValidAuthorizationName).mockResolvedValue(someValidAuthorization)
    authorizationService.findByName.calledWith(anotherValidAuthorizationName).mockResolvedValue(anotherValidAuthorization)
    roleRepository.findById.calledWith(validRoleId).mockResolvedValue(findedRole)
    roleRepository.save.calledWith(updatedRole).mockResolvedValue(updatedRole)

    // And calling
    const returnedUpdatedRole = await roleService.updateAuthorizations(rolepartial)

    // Then 
    expect(returnedUpdatedRole).toBeInstanceOf(Role)
    expect(returnedUpdatedRole).toBe(updatedRole)
  })

  test('updateAuthorizations should throw Error when invalid rolePartial.id is passed', async () => {
    // Given
    const invalidRoleId = 1
    const rolepartial = {
      id: invalidRoleId
    }

    // When mocking
    roleRepository.findById.calledWith(invalidRoleId).mockResolvedValue(null)

    // And calling
    const updatePremissionsPromise = roleService.updateAuthorizations(rolepartial)

    // Then
    expect(updatePremissionsPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('updateAuthorizations should throw Error when any invalid authorizationPartial.name is passed', async () => {
    // Given
    const validRoleId = 1
    const validAuthorizationName = 'validAuthorizationName'
    const invalidAuthorizationName = 'invalidAuthorizationName'
    const rolePartial = {
      id: validRoleId,
      authorizations: [
        { name: validAuthorizationName },
        { name: invalidAuthorizationName }
      ]
    }

    // When mocking
    roleRepository.findById.mockResolvedValue(createMock<Role>())
    authorizationService.findByNames.mockRejectedValue(new InvalidEntityIdentifierError(Authorization.name, 'name', invalidAuthorizationName))

    // And calling
    const updatedRolePromisse = roleService.updateAuthorizations(rolePartial)

    // Then 
    expect(updatedRolePromisse).rejects.toThrow(InvalidEntityIdentifierError)
  })
})

