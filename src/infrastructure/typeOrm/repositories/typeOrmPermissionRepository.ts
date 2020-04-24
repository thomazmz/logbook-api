import { EntityRepository, AbstractRepository } from 'typeorm'
import { Permission } from '../../../domain/permission/permission'
import { PermissionRepository } from '../../../domain/permission/permissionRepository'
import { PermissionSchema } from '../schemas/permissionSchema'

@EntityRepository(PermissionSchema)
export class TypeOrmPermissionRepository extends AbstractRepository<Permission> implements PermissionRepository {

  save(permission: Permission): Promise<Permission> {
    return this.repository.save(permission)
  }

  findAll(): Promise<Permission[]> {
    return this.repository.find()
  }

  findByName(name: string): Promise<Permission> {
    return this.repository.findOne({where: { name }})
  }

  findOrCreate(attributes: Partial<Permission>): Promise<Permission> {
    return this.repository.findOne({ where: attributes})
      .then(permission => permission ? permission : this.repository.save(new Permission(attributes)))
  }
  
  findOrCreateMany(attributes: Partial<Permission>[]): Promise<Permission[]> {
    return Promise.all(attributes.map(permissionAttributes => this.findOrCreate(permissionAttributes)))
  }

  async deleteByName(name: string) {
    await this.repository.findOne({ where: { name }})
      .then(permission => this.repository.delete(permission))
  }
}