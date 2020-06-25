import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { InvalidEntityIdentifierError } from '../errors/invalidEntityIdentifierError'
import { FinancialRecordService } from './financialRecordService'
import { FinancialRecordRepository } from './financialRecordRepository'
import { financialRecordServiceFactory } from './financialRecordServiceFactory'
import { FinancialRecord } from './financialRecord'

describe('roleService tests', () => {

  let financialRecordService: FinancialRecordService
  let financialRecordRepository: Mock<FinancialRecordRepository>

  beforeEach(async () => {
    financialRecordRepository = createMock<FinancialRecordRepository>()
    financialRecordService = financialRecordServiceFactory(financialRecordRepository)
  })

  test('findAll method should return all FinancialRecord entities in FinancialRecordRepository', async () => {
    // Given
    const someFinancialRecord = new FinancialRecord({ title: 'someFinancialRecord' })
    const anotherFinancialRecord = new FinancialRecord({ title: 'anotherFinancialRecord' })
    // When mocking
    const mockedFinancialRecords = [ someFinancialRecord, anotherFinancialRecord ]
    financialRecordRepository.findAll.mockResolvedValue(mockedFinancialRecords)
    // And calling
    const findedFinanialRecords = await financialRecordService.findAll()
    // Then
    expect(findedFinanialRecords).toBe(mockedFinancialRecords)
  })

  test('create method should return saved FinancialRecord entity', async () => {
    // Given
    const id = 1
    const title = 'someFinancialRecord'
    const value = 0
    const financialRecordParial = { title, value }
    const savedFinancialRecord = new FinancialRecord({ id, title, value })
    // When mocking
    financialRecordRepository.save.mockResolvedValue(savedFinancialRecord)
    // And calling
    const createdFinancialRecord = await financialRecordService.create(financialRecordParial)
    // Then
    expect(createdFinancialRecord).toBeInstanceOf(FinancialRecord)
    expect(createdFinancialRecord).toBe(savedFinancialRecord)
  })

  test('findById method should find FinancialRecord entity when valid FinancialRecord id is passed', async () => {
    // Given
    const id = 1
    const title = 'someFinancialRecord'
    const value = 0
    const financialRecordParial = { title, value }
    const savedFinancialRecord = new FinancialRecord({ id, title, value })
    // When mockings
    financialRecordRepository.findById.calledWith(id).mockResolvedValue(savedFinancialRecord)
    // And calling
    const findedFinancialRecord = await financialRecordService.findById(id)
    // Then
    expect(findedFinancialRecord).toBeInstanceOf(FinancialRecord)
    expect(findedFinancialRecord).toBe(savedFinancialRecord)
  })

  test('findById method should throw Error when invalid Role id is passed', async () => {
    // Given
    const invalidFinancialRecordId = 1;
    // When
    financialRecordRepository.findById.calledWith(invalidFinancialRecordId).mockResolvedValue(null)
    // Then
    expect(financialRecordService.findById(invalidFinancialRecordId)).rejects.toThrow(InvalidEntityIdentifierError)
  })
})

