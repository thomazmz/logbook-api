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
    const financialRecord = new FinancialRecord(financialRecordPartial)
    return financialRecordRepository.save(financialRecord)
  },

  async findById(financialRecordId: number): Promise<FinancialRecord> {
    const findedFinancialRecord = await financialRecordRepository.findById(financialRecordId)
    if(!findedFinancialRecord) throw new InvalidEntityIdentifierError(FinancialRecord.name, 'id', financialRecordId)
    return findedFinancialRecord
  },

  async update(financialRecordPartial: FinancialRecordPartial): Promise<FinancialRecord> {
    const { id, title, value, dueAt, paidAt } = financialRecordPartial

    const findedFinancialRecord = await this.findById(id)
    if(title) findedFinancialRecord.title = title
    if(value) findedFinancialRecord.value = value
    if(dueAt) findedFinancialRecord.dueAt = dueAt
    if(paidAt) findedFinancialRecord.paidAt = paidAt

    return financialRecordRepository.save(findedFinancialRecord)
  }
})