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

  test('findAll method should return all financial records in financial record repository', async () => {
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
})

