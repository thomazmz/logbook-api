import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn } from "typeorm";
import Role from '../role/Role.entity'

@Entity()
export default class Account {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @ManyToMany(type => Role, role => role.accounts, { cascade: true })
  roles: Role[];

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  setPasswordHash (passwordLiteral: string): void {
    this.passwordHash = passwordLiteral;
  }
}