import {MigrationInterface, QueryRunner} from "typeorm";

export class createRoleTable1586238580380 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE role (
        "id" SERIAL NOT NULL CONSTRAINT "role_primary_key" PRIMARY KEY,
        "name" VARCHAR NOT NULL CONSTRAINT "role_name_unique_key" UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE role;
    `);
  }
}