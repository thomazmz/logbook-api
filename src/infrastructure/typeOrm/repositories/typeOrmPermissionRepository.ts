import { EntityRepository } from 'typeorm'
import { Permission } from '../../../domain/permission/permission'
import { PermissionRepository } from '../../../domain/permission/permissionRepository'
import { PermissionSchema } from '../schemas/permissionSchema'
import { TypeOrmCrudRepository } from './typeOrmCrudRepository'

@EntityRepository(PermissionSchema)
export class TypeOrmPermissionRepository extends TypeOrmCrudRepository<Permission, number> implements PermissionRepository {

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