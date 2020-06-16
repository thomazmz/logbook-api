import { EntitySchemaColumnOptions } from 'typeorm'

export const BaseSchema = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions
};