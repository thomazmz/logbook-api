export type deleteById<IdentifierType> = (id: IdentifierType) => Promise<void>
export type findAll<EntityType> = () => Promise<EntityType[]>
export type findById<EntityType, Id> = (id: Id) => Promise<EntityType>
export type save<EntityType> = (entity:EntityType) =>  Promise<EntityType>

export interface CrudRepository<T, Id> {
  deleteById: deleteById<Id>,
  findAll: findAll<T>,
  findById: findById<T, Id>,
  save: save<T>,
}