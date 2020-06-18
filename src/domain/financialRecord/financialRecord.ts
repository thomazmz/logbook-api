export interface FinancialRecordPartial {
  id?: number
  title?:string
  value?: number
  createdAt?: number
  updatedAt?: number
  paidAt?: Date
  dueAt?: Date
}

export class FinancialRecord {

  id: number
  title: string
  value: number
  createdAt: Date
  updatedAt: Date
  paidAt: Date
  dueAt: Date

  constructor(partial: FinancialRecordPartial) {
    Object.assign(this, partial)
  }
}