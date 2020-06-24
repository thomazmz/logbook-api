import { FinancialRecord, FinancialRecordPartial } from './financialRecord'

export type FinancialRecordService = { 
  findAll(): Promise<FinancialRecord[]>
  create(financiatlRecordPartial: FinancialRecordPartial): Promise<FinancialRecord>
  findById(roleId:number): Promise<FinancialRecord>
  update(financiatlRecordPartial: FinancialRecordPartial): Promise<FinancialRecord>
}