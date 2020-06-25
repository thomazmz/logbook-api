import { InvalidEntityIdentifierError } from '../errors/invalidEntityIdentifierError'
import { FinancialRecordRepository } from './financialRecordRepository'
import { FinancialRecordService } from './financialRecordService'
import { FinancialRecord, FinancialRecordPartial } from './financialRecord'

export const financialRecordServiceFactory = (
  financialRecordRepository: FinancialRecordRepository
): FinancialRecordService => ({

  async findAll(): Promise<FinancialRecord[]> {
    const findedFinancialRecords = await financialRecordRepository.findAll()
    return findedFinancialRecords
  },

  async create(financialRecordPartial: FinancialRecordPartial): Promise<FinancialRecord> {
    return null;
  },

  async findById(financialRecordId: number): Promise<FinancialRecord> {
    return null;
  },

  async update(financialRecordPartial: FinancialRecordPartial): Promise<FinancialRecord> {
    return null;
  }
})