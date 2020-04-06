import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn } from "typeorm";
import Account from '../account/Account.entity';
import Permission from '../permissions/Permission.entity'

@Entity()
export default class Role {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({type: "timestamp"})
  screatedAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @Column({ unique: true })
  name: string

  @ManyToMany(type => Permission, permission => permission.roles, { cascade: true })
  @JoinTable({ name: 'roles_by_accounts '})
  permissions: Permission[]

  @ManyToMany(type => Account, account => account.roles)
  accounts: Account[]

  constructor(name: string) {
    this.name = name;
  }

  setPermissions(permissions: Permission[]) {
    this.permissions = permissions;
  }
}