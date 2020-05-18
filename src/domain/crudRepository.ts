export interface CrudRepository<T, ID> {
  save(t:T): Promise<T>
  findById(id: ID): Promise<T>
  findAll(): Promise<T[]>
  deleteById(id: ID): Promise<void>
}