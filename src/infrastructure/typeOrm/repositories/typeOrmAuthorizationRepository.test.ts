import { Connection} from 'typeorm'
import { init as setUpDatabase } from '../initializer'
import { typeOrmAuthorizationRepositoryFactory } from './typeOrmAuthorizationRepository'
import { Authorization, AuthorizationRepository } from '../../../domain'
import { generateAuthorizationPartial } from '../testUtils'

describe('TypeOrmAuthorizationRepository tests', () => {

  let databaseConnection: Connection
  let authorizationRepository: AuthorizationRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    authorizationRepository = typeOrmAuthorizationRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  test('findOrCreate should create Authorization entity', async () => {
    // Given
    const authorizationPartial = generateAuthorizationPartial()
    
    // When
    const authorization = await authorizationRepository.findOrCreate(authorizationPartial)
    const findedAuthorization = await databaseConnection.createQueryBuilder()
      .select('authorization')
      .from(Authorization, 'authorization')
      .where('authorization.id = :id', { id: authorization.id })
      .getOne()
    
    // Then
    expect(authorization).toBeInstanceOf(Authorization)
    expect(authorization.id).toBe(findedAuthorization.id)
    expect(authorization.name).toBe(findedAuthorization.name)
  })

  test('findOrCreate should find Authorization entity', async () => {
    // Given
    const authorizationPartial = generateAuthorizationPartial()

    const result = await databaseConnection.createQueryBuilder()
      .insert()
      .into(Authorization)
      .values(authorizationPartial)
      .returning('*')
      .execute()

    // When
    const findedAuthorization = await databaseConnection.createQueryBuilder()
      .select('authorization')
      .from(Authorization, 'authorization')
      .where('authorization.name = :name', authorizationPartial)
      .getOne()

    const authorization = await authorizationRepository.findOrCreate(authorizationPartial)

    // Then
    expect(authorization).toBeInstanceOf(Authorization)
    expect(authorization.id).toBe(findedAuthorization.id)
    expect(authorization.name).toBe(findedAuthorization.name)
  })

  test('findOrCreateMany should find or create many Authorization entities', async () => {
    // Given a array with two valid permissioin names
    const names = [ generateAuthorizationPartial().name, generateAuthorizationPartial().name ]
    
    // When calling findOrCreateMany with the array as parameter
    const authorizations = await authorizationRepository.findOrCreateMany(names.map(name => ({ name })))
    
    // Then all values returned by findOrCreateMany should be of type Authorization
    expect(authorizations[0]).toBeInstanceOf(Authorization)
    expect(authorizations[1]).toBeInstanceOf(Authorization)
  })

  test('findOrCreateMany should find or create many Authorization entities', async () => {
    // Given a list with two valid permissioin names
    const names = [ generateAuthorizationPartial().name, generateAuthorizationPartial().name ]
    
    // When calling findOrCreateMany with the previous mentioned list as parameter
    const authorizations = await authorizationRepository.findOrCreateMany(names.map(name => ({ name })))
    
    // And performing a query for all the authorizations whose names are on the list
    const findedAuthorizations = await databaseConnection.createQueryBuilder()
      .select('authorization')
      .from(Authorization, 'authorization')
      .where('authorization.name IN (:...names)', { names })
      .getMany()

    // Then the values returned by the findOrCreateMany should be contained on the values returned by the query
    expect(authorizations.map(p => p.id).includes(findedAuthorizations[0].id)).toBeTruthy()
    expect(authorizations.map(p => p.id).includes(findedAuthorizations[1].id)).toBeTruthy()
    expect(authorizations.map(p => p.name).includes(findedAuthorizations[0].name)).toBeTruthy()
    expect(authorizations.map(p => p.name).includes(findedAuthorizations[1].name)).toBeTruthy()
  })
})