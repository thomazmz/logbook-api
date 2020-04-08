import {MigrationInterface, QueryRunner} from "typeorm";

export class createAccountTable1586236085553 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "account" (
        "id" SERIAL NOT NULL CONSTRAINT "account_primary_key" PRIMARY KEY,
        "email" VARCHAR NOT NULL CONSTRAINT "account_email_unique_key" UNIQUE,
        "username" VARCHAR NOT NULL CONSTRAINT "account_username_unique_key" UNIQUE,
        "password_hash" VARCHAR NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE account;
    `);
  }
}