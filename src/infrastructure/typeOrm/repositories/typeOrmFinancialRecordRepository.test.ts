import { Connection} from 'typeorm'
import { init as setUpDatabase } from '../initializer'
import { FinancialRecordRepository, FinancialRecord } from '../../../domain'
import { typeOrmFinancialRecordRepositoryFactory } from './typeOrmFinancialRecordRepository'
import { generateFinancialRecordPartial } from '../testUtils'

describe('TypeOrmAuthorizationRepository tests', () => {

  let databaseConnection: Connection
  let financialRecordRepository: FinancialRecordRepository

  beforeAll(async () => {
    databaseConnection = await setUpDatabase()
    financialRecordRepository = typeOrmFinancialRecordRepositoryFactory()
  })

  afterAll(async () => {
    await databaseConnection.close()
  })

  test('filterByDueDateRange should return only on range entities', async () => {

    // Given
    const floor = new Date(2020, 3, 1, 12, 30, 0)
    const ceeling = new Date(2020, 4, 1, 12, 30, 0)

    const financialRecordPartials = [
      generateFinancialRecordPartial({ dueAt: new Date(2020, 2, 1, 12, 30, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 3, 1, 12, 25, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 3, 1, 12, 30, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 3, 1, 12, 35, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 4, 1, 12, 25, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 4, 1, 12, 30, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 4, 1, 12, 35, 0) }),
      generateFinancialRecordPartial({ dueAt: new Date(2020, 5, 1, 12, 30, 0) }),
    ]

    const financialRecords = await Promise.all(financialRecordPartials.map(financialRecordPartial => {
      return financialRecordRepository.save(new FinancialRecord(financialRecordPartial))
    }))

    const expectedFinancialRecords = financialRecords.filter(financialRecord => {
      return financialRecord.dueAt >= floor && financialRecord.dueAt <= ceeling
    })

    // When
    const filteredFinancialRecords = await financialRecordRepository.filterByDueDateRange(floor, ceeling)

    // Then
    expect(expectedFinancialRecords.map(fr => fr.id).includes(filteredFinancialRecords[0].id)).toBeTruthy()
    expect(expectedFinancialRecords.length).toBe(4)
    expect(filteredFinancialRecords.length).toBe(4)
  })
})