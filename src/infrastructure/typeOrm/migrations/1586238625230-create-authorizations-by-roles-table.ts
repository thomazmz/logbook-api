import { MigrationInterface, QueryRunner } from "typeorm";

export class createAuthorizationsByRolesTable1586238625230 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE authorizations_by_roles (
        "role_id" INTEGER NOT NULL CONSTRAINT "authorizations_by_roles_role_id_foreign_key" REFERENCES role ON DELETE CASCADE,
        "authorization_id" INTEGER NOT NULL CONSTRAINT "authorizations_by_roles_authorization_id_foreign_key" REFERENCES "authorization" ON DELETE CASCADE,
        CONSTRAINT "authorizations_by_roles_primary_key" PRIMARY KEY ("role_id", "authorization_id")
      );
      CREATE INDEX "authorizations_by_roles_role_id_index"
        ON authorizations_by_roles ("role_id");
      CREATE INDEX "authorizations_by_roles_authorization_id_index"
        ON authorizations_by_roles ("authorization_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE authorizations_by_roles;
    `);
  }
}