import  { FinancialRecord } from './financialRecord'

export interface FinancialRecordRepository {
  deleteById(id: number): Promise<void>
  findAll(): Promise<FinancialRecord[]>
  save(financialRecord: FinancialRecord): Promise<FinancialRecord>
  findById(id: number): Promise<FinancialRecord>
  filterByDueDateRange(floor: Date, ceeling: Date): Promise<FinancialRecord[]>
  filterByPaidDateRange(floor: Date, ceeling: Date): Promise<FinancialRecord[]>
}