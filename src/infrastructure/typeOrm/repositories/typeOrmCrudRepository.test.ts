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
    name: 'TestResource', columns: { ...BaseSchema }
  })
  
  @EntityRepository(TestResourceSchema)
  class TypeOrmTestResourceRepository extends TypeOrmCrudRepository<TestResource, string> {
    // In production code the TestResourceSchemaRepository specific methods and properties would be implemented here.
  }

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

  // FIXME TypeORM repository is not returning model class entity but plain javascript objects
  //
  // Asked question on Stack Overflow 
  //   https://stackoverflow.com/questions/61582489/why-typeorm-repository-findone-method-are-returning-plain-objects
  // Opened issue on typeorm github 
  //   https://github.com/typeorm/typeorm/issues/5996
  //
  // it('should return a TestResource object when findById is called', async () => {
  //   // Given
  //   const testResource = new TestResource()
  //   // When
  //   await testResourceRepository.save(testResource)
  //   const findedResource: TestResource = await testResourceRepository.findById(testResource.id)
  //   // Then
  //   expect(findedResource).toEqual(testResource)
  // })

  it('should save and find saved resource by id', async () => {
    // Given
    const testResource = new TestResource()
    // When
    await testResourceRepository.save(testResource)
    const findedResource: TestResource = await testResourceRepository.findById(testResource.id)
    // Then
    expect(findedResource).toEqual(testResource)
  })

  it('should define values for id, createdAt and updatedAt attributes when save method is called', async () => {
    // Given
    const testResource = new TestResource()
    // When
    await testResourceRepository.save(testResource)
    // Then
    expect(testResource.id).not.toEqual(null)
    expect(testResource.createAt).not.toEqual(null)
    expect(testResource.updatedAt).not.toEqual(null)
  })

  it('should not be able to find resource by id after deleting it', async () => {
    // Given
    const testResource = new TestResource()
    // When
    await testResourceRepository.save(testResource)
    await testResourceRepository.deleteById(testResource.id)
    const findedResource = await testResourceRepository.findById(testResource.id)
    // Then
    expect(findedResource).toEqual(undefined)
  })
})