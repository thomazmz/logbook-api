import {MigrationInterface, QueryRunner} from "typeorm";

export class createPermissionTable1586238595799 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE permission (
        "id" SERIAL NOT NULL CONSTRAINT "permission_primary_key" PRIMARY KEY,
        "name" VARCHAR NOT NULL CONSTRAINT "permission_name_unique_key" UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE permission;
    `);
  }
}