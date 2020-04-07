import {MigrationInterface, QueryRunner} from "typeorm";

export class createRolesByAccountsTable1586238612831 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE roles_by_accounts(
        "account_id" INTEGER NOT NULL CONSTRAINT "roles_by_accounts_account_id_foreign_key" REFERENCES account ON DELETE CASCADE,
        "role_id" INTEGER NOT NULL CONSTRAINT "roles_by_accounts_role_id_foreign_key" REFERENCES role ON DELETE CASCADE,
        CONSTRAINT "roles_by_accounts_primary_key" PRIMARY KEY ("account_id", "role_id")
      );
      CREATE INDEX "roles_by_accounts_account_id_index"
        ON roles_by_accounts ("account_id");
      CREATE INDEX "roles_by_accounts_role_id_index"
        ON roles_by_accounts ("role_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE roles_by_accounts;
    `);
  }
}


