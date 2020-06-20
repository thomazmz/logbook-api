import { EntityRepository, getCustomRepository, MoreThan, MoreThanOrEqual, LessThanOrEqual, Between } from 'typeorm'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'
import { FinancialRecordSchema } from '../schemas/financialRecordSchema'
import { FinancialRecord, FinancialRecordRepository } from '../../../domain'

@EntityRepository(FinancialRecordSchema)
export class TypeOrmFinancialRecordRepository extends TypeOrmCrudRepository<FinancialRecord, number> implements FinancialRecordRepository {

  filterByDueDateRange(floor: Date, ceeling: Date): Promise<FinancialRecord[]> {
    return this.repository.createQueryBuilder('financialRecord')
      .where( `financialRecord.dueAt >= :floor AND financialRecord.dueAt <= :ceeling`, { floor, ceeling } )
      .getMany();
  }
}

export const typeOrmFinancialRecordRepositoryFactory = (): FinancialRecordRepository => {
  return getCustomRepository(TypeOrmFinancialRecordRepository)
}