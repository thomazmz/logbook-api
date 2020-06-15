import {MigrationInterface, QueryRunner} from "typeorm";

export class createFinancialRecordTable1594523968685 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE "financial_record" (
        "id" SERIAL NOT NULL CONSTRAINT "financial_record_primary_key" PRIMARY KEY,
        "title" VARCHAR NOT NULL,
        "value" INTEGER NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMPTZ DEFAULT now() NOT NULL,
        "paid_at" TIMESTAMPTZ,
        "due_at" TIMESTAMPTZ 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE financial_record;
    `);
  }

}
