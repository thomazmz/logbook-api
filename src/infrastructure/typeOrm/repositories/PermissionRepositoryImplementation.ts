import { EntityRepository, AbstractRepository } from 'typeorm'
import { Permission, PermissionRepository } from '../../../domain/permission'
import { RoleSchema } from '../schemas/RoleSchema'

@EntityRepository(RoleSchema)
export class PermissionRepositoryImplementation extends AbstractRepository<Permission> implements PermissionRepository {

  findAll(): Promise<Permission[]> {
    return this.repository.find()
  }

  findOrCreateByName(name: string): Promise<Permission> {
    return this.repository.findOne({ where: { name }})
      .then(permission => permission ? permission : this.repository.save(new Permission(name)))
  }

  findOrCreateByNames(names: string[]): Promise<Permission[]> {
    return Promise.all(names.map(name => this.findOrCreateByName(name)))
  }

  async deleteByName(name: string) {
    await this.repository.findOne({ where: { name }})
      .then(permission => this.repository.remove(permission))
  }

  async deleteByNames(names: string[]) {
    this.repository.find({ where: { name: names }})
      .then(permissions => this.repository.remove(permissions))
  }
}