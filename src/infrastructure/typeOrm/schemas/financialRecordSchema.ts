import { EntitySchema } from 'typeorm';
import { FinancialRecord } from '../../../domain'
import { BaseSchema } from './baseSchema';

export const FinancialRecordSchema = new EntitySchema<FinancialRecord>({
  target: FinancialRecord,
  name: FinancialRecord.name,
  columns: {
    ...BaseSchema,
    title: {
      type: String
    },
    value: {
      type: Number
    },
    dueAt: {
      type: 'timestamp with time zone'
    },
    paidAt: {
      type: 'timestamp with time zone'
    }
  }
})