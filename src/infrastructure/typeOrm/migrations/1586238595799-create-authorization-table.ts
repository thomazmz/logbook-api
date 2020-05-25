import { MigrationInterface, QueryRunner } from "typeorm";

export class createAuthorizationsTable1586238595799 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "authorization" (
        "id" SERIAL NOT NULL CONSTRAINT "authorization_primary_key" PRIMARY KEY,
        "name" VARCHAR NOT NULL CONSTRAINT "authorization_name_unique_key" UNIQUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE "authorization";
    `);
  }
}