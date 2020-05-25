import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { InvalidEntityIdentifierError } from '../errors/invalidEntityIdentifierError'
import { authorizationServiceFactory } from './authorizationServiceFactory'
import { AuthorizationService } from './authorizationService'
import { AuthorizationRepository } from './authorizationRepository'
import { Authorization } from './authorization'

describe('authorizationService tests', () => {

  let authorizationService: AuthorizationService
  
  let authorizationRepository: Mock<AuthorizationRepository>

  let authorizationNames: string[] = [ 
    'someValidAuthorizationName', 
    'anotherValidAuthorizationName' 
  ]

  beforeEach(async () => {
    authorizationRepository = createMock<AuthorizationRepository>()
    authorizationService = authorizationServiceFactory(authorizationNames, authorizationRepository)
  })

  test('findAll should return all authorizations', async () => {
    // Given
    const authorizations = authorizationNames.map(name => new Authorization({ name }))
    // When mocking
    authorizationRepository.findOrCreateMany.mockResolvedValue(authorizations)
    // And calling
    const findedAuthorizations = await authorizationService.findAll()
    // Then
    expect(findedAuthorizations).toBe(authorizations)
  })

  test('findByName should throw Error when name is considered invalid', async () => {
    // Given
    const name = 'invalidAuthorizationName'
    // When
    const authorizationPromise = authorizationService.findByName(name)
    // Then
    expect(authorizationPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })  
  
  test('findByName should throw Error when name parameter is undefined', () => {
    // Given
    const name = undefined
    // When 
    const authorizationPromise = authorizationService.findByName(name)
    // Then
    expect(authorizationPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByName should throw Error when name parameter is null', () => {
    // Given
    const name = null
    // When 
    const authorizationPromise = authorizationService.findByName(name)
    // Then
    expect(authorizationPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByName should return Authorization entity', async () => {
    // Given
    const name = 'someValidAuthorizationName'
    const authorization = new Authorization({ name })
    // When mocking
    authorizationRepository.findOrCreate.mockResolvedValue(authorization)
    // And calling
    const findedAuthorization = await authorizationService.findByName(name)
    // Then
    expect(findedAuthorization).toBeInstanceOf(Authorization)
  })

  test('findByName should return expected Authorization entity', async () => {
    // Given
    const id = 1 
    const name = 'someValidAuthorizationName'
    const authorization = new Authorization({ id, name })
    // When mocking
    authorizationRepository.findOrCreate.mockResolvedValue(authorization)
    // And calling
    const findedAuthorization = await authorizationService.findByName(name)
    // Then
    expect(findedAuthorization).toEqual(authorization)
  })

  test('findByNames should throw Error if any of the names is invalid', async () => {
    // Given
    const names = [ 'someInvalidAuthorization' ]
    // When
    const authorizationPromise = authorizationService.findByNames(names)
    // Then
    expect(authorizationPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('findByNames should return Authorization entities', async () => {
    // Given
    const names = [ 'someValidAuthorizationName', 'anotherValidAuthorizationName' ]
    const authorizations = names.map((name, index) => new Authorization({ id: index+1, name }))
    // When mocking
    authorizationRepository.findOrCreate
      .mockResolvedValueOnce(authorizations[0])
      .mockResolvedValueOnce(authorizations[1])
    // And calling
    const findedAuthorizations = await authorizationService.findByNames(names)
    // Then
    expect(findedAuthorizations[0]).toBeInstanceOf(Authorization)
    expect(findedAuthorizations[1]).toBeInstanceOf(Authorization)
  })

  test('findByNames should return expected Authorization entities', async () => {
    // Given
    const names = [ 'someValidAuthorizationName', 'anotherValidAuthorizationName' ]
    const authorizations = names.map((name, index) => new Authorization({ id: index+1, name }))
    // When mocking
    authorizationRepository.findOrCreate
      .mockResolvedValueOnce(authorizations[0])
      .mockResolvedValueOnce(authorizations[1])
    // And calling
    const findedAuthorizations = await authorizationService.findByNames(names)
    // Then
    expect(findedAuthorizations).toEqual(authorizations)
  })
})