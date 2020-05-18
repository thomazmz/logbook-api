import { getCustomRepository, EntitySchema, EntityRepository, Connection, QueryRunner } from 'typeorm'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'
import { BaseSchema } from '../schemas/baseSchema'
import { init as setUpDatabaseConnection } from '../initializer'

describe('TypeOrmCrudRepository tests', () => {

  class TestResource {
    id: string
    createAt: number
    updatedAt: number
  }

  const TestResourceSchema = new EntitySchema<TestResource>({
    name: TestResource.name,
    target: TestResource,
    tableName: 'testResource',
    columns: { ...BaseSchema }
  })
  
  @EntityRepository(TestResourceSchema)
  class TypeOrmTestResourceRepository extends TypeOrmCrudRepository<TestResource, string> {}

  let databaseConnection: Connection
  let queryRunner: QueryRunner
  let testResourceRepository: TypeOrmTestResourceRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabaseConnection({ entities: [ TestResourceSchema ], synchronize: true })
    queryRunner = databaseConnection.createQueryRunner()
    testResourceRepository = getCustomRepository(TypeOrmTestResourceRepository)
  })

  afterAll(async () => {
    await databaseConnection.close()
    await queryRunner.dropTable('test_resource')
  })
  
  test('findById should return TestResource entity', async () => {
    // Given
    const testResource = new TestResource()
    await testResourceRepository.save(testResource)
    // When
    const findedTestResource = await testResourceRepository.findById(testResource.id)
    // Then
    expect(findedTestResource).toBeInstanceOf(TestResource)
  })

  test('findById should find TestResource by id', async () => {
    // Given
    const testResource = new TestResource()
    await testResourceRepository.save(testResource)
    // When
    const findedTestResource = await testResourceRepository.findById(testResource.id)
    // Then
    expect(findedTestResource).toEqual(testResource)
  })

  test('save should define values for id, createdAt and updatedAt', async () => {
    // Given
    const testResource = new TestResource()
    // When
    await testResourceRepository.save(testResource)
    // Then
    expect(testResource.id).not.toEqual(null)
    expect(testResource.createAt).not.toEqual(null)
    expect(testResource.updatedAt).not.toEqual(null)
  })

  test('findAll should return all TestEntities on the database', async () => {
    // Given that there is no TestResource entity persisted on the database
    await databaseConnection.createQueryBuilder()
      .delete()
      .from(TestResource)
      .execute()
    // And I persist two TestResource entities
    const firstPersistedTestResource = await testResourceRepository.save(new TestResource())
    const secondPersistedTestResource = await testResourceRepository.save(new TestResource())
    // When
    const findedTestResources = await testResourceRepository.findAll()
    // Then
    expect(findedTestResources.length).toBe(2)
    expect(findedTestResources[0].id).toBe(firstPersistedTestResource.id)
    expect(findedTestResources[1].id).toBe(secondPersistedTestResource.id)
  })

  test('deleteById should delete reource', async () => {
    // Given
    const testResource = new TestResource()
    await testResourceRepository.save(testResource)
    // When
    await testResourceRepository.deleteById(testResource.id)
    const findedTestResource = await testResourceRepository.findById(testResource.id)
    // Then
    expect(findedTestResource).toEqual(undefined)
  })
})
