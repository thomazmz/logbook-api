import { mock as createMock, MockProxy as Mock } from 'jest-mock-extended'
import { InvalidEntityIdentifierError } from '../errors/invalidEntityIdentifierError'
import { FinancialRecordService } from './financialRecordService'
import { FinancialRecordRepository } from './financialRecordRepository'
import { financialRecordServiceFactory } from './financialRecordServiceFactory'
import { FinancialRecord } from './financialRecord'

describe('financialRecordService tests', () => {

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

  test('findById method should throw InvalidEntityIdentifierError when invalid FinancialRecord id is passed', async () => {
    // Given
    const invalidFinancialRecordId = 10;
    // When mocking
    financialRecordRepository.findById.calledWith(invalidFinancialRecordId).mockResolvedValue(null)
    // And Calling 
    const findByIdPromise = financialRecordService.findById(invalidFinancialRecordId)
    // Then
    await expect(findByIdPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('update method should throw InvalidEntityIdentifierError when invalid FinancialRecord id is passed trough partial', async () => {
    // Given
    const invalidFinancialRecordPartial = {
      id: 1,
    }
    // When mocking
    financialRecordRepository.findById.calledWith(invalidFinancialRecordPartial.id).mockResolvedValue(null)
    // And Calling 
    const findByIdPromise = financialRecordService.update(invalidFinancialRecordPartial)
    // Then
    await expect(findByIdPromise).rejects.toThrow(InvalidEntityIdentifierError)
  })

  test('update method should update title', async () => {
    // Given
    const financialRecord = new FinancialRecord({ 
      id: 1,
      title: 'someFinancialRecordTitle'
    })
    const financialRecordPartial = {
      id: 1,
      title: 'anotherFinancialRecordTitle'
    }
    // When mocking 
    financialRecordRepository.findById.calledWith(financialRecordPartial.id).mockResolvedValue(financialRecord)
    financialRecordRepository.save.mockImplementation(fr => Promise.resolve(fr))
    // And calling
    const updatedFinancialRecord = await financialRecordService.update(financialRecordPartial)
    // Then
    expect(updatedFinancialRecord.id).toBe(financialRecordPartial.id)
    expect(updatedFinancialRecord.title).toBe(financialRecordPartial.title)
  })

  test('update method should update value', async () => {
    // Given
    const financialRecord = new FinancialRecord({ 
      id: 1,
      value: 0
    })
    const financialRecordPartial = {
      id: 1,
      value: 1
    }
    // When mocking 
    financialRecordRepository.findById.calledWith(financialRecordPartial.id).mockResolvedValue(financialRecord)
    financialRecordRepository.save.mockImplementation(fr => Promise.resolve(fr))
    // And calling
    const updatedFinancialRecord = await financialRecordService.update(financialRecordPartial)
    // Then
    expect(updatedFinancialRecord.id).toBe(financialRecordPartial.id)
    expect(updatedFinancialRecord.value).toBe(financialRecordPartial.value)
  })

  test('update method should update dueAt', async () => {
    // Given
    const financialRecord = new FinancialRecord({ 
      id: 1,
      dueAt: new Date(2020, 1, 20)
    })
    const financialRecordPartial = {
      id: 1,
      dueAt: new Date(2020, 1, 21)
    }
    // When mocking 
    financialRecordRepository.findById.calledWith(financialRecordPartial.id).mockResolvedValue(financialRecord)
    financialRecordRepository.save.mockImplementation(fr => Promise.resolve(fr))
    // And calling
    const updatedFinancialRecord = await financialRecordService.update(financialRecordPartial)
    // Then
    expect(updatedFinancialRecord.id).toBe(financialRecordPartial.id)
    expect(updatedFinancialRecord.dueAt).toBe(financialRecordPartial.dueAt)
  })

  test('update method should update paidAt', async () => {
    // Given
    const financialRecord = new FinancialRecord({ 
      id: 1,
      paidAt: new Date(2020, 1, 20)
    })
    const financialRecordPartial = {
      id: 1,
      paidAt: new Date(2020, 1, 21)
    }
    // When mocking 
    financialRecordRepository.findById.calledWith(financialRecordPartial.id).mockResolvedValue(financialRecord)
    financialRecordRepository.save.mockImplementation(fr => Promise.resolve(fr))
    // And calling
    const updatedFinancialRecord = await financialRecordService.update(financialRecordPartial)
    // Then
    expect(updatedFinancialRecord.id).toBe(financialRecordPartial.id)
    expect(updatedFinancialRecord.paidAt).toBe(financialRecordPartial.paidAt)
  })

  test('update method should have no effect if role partial has no attributes', async () => {
    // Given
    const financialRecord = new FinancialRecord({ 
      id: 1,
      title: 'someFinancialRecordTitle',
      value: 1,
      dueAt: new Date(2020, 1, 21),
      paidAt: new Date(2020, 1, 21),
    })
    const financialRecordPartial = {
      id: 1
    }
    // When mocking 
    financialRecordRepository.findById.calledWith(financialRecordPartial.id).mockResolvedValue(financialRecord)
    financialRecordRepository.save.mockImplementation(r => Promise.resolve(r))
    // And calling
    const updatedFinancialRecord = await financialRecordService.update(financialRecordPartial)
    // Then
    expect(updatedFinancialRecord.id).toBe(financialRecord.id)
    expect(updatedFinancialRecord.title).toBe(financialRecord.title)
  })
})
