import { AbstractRepository } from "typeorm"
import { CrudRepository } from "../../../domain";

export abstract class TypeOrmCrudRepository<T, ID> extends AbstractRepository<T> implements CrudRepository<T, ID> {

  save(t:T): Promise<T> {
    return this.repository.save(t)
  }

  findById(id: ID): Promise<T> {
    return this.repository.findOne({ where: { id }})
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async deleteById(id: ID): Promise<void> {
    await this.repository.delete(id);
  }
}