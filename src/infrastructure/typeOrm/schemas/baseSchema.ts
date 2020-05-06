import { EntitySchemaColumnOptions } from 'typeorm'

export const BaseSchema = {
  id: {
    type: Number,
    primary: true,
    generated: 'increment',
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions
};