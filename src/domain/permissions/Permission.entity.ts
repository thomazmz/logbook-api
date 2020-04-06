import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn } from "typeorm";
import Role from '../role/Role.entity';

@Entity()
export default class Permission {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @Column()
  name: string

  @ManyToMany(type => Role, role => role.permissions)
  @JoinTable({ name: 'permissions_by_roles'})
  roles: Role[]

  constructor(name: string) {
    this.name = name;
  }
}