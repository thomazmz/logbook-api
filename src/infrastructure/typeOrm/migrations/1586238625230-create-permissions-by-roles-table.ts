import {MigrationInterface, QueryRunner} from "typeorm";

export class createPermissionsByRolesTable1586238625230 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE permissions_by_roles (
        "role_id" INTEGER NOT NULL CONSTRAINT "permissions_by_roles_role_id_foreign_key" REFERENCES role ON DELETE CASCADE,
        "permission_id" INTEGER NOT NULL CONSTRAINT "permissions_by_roles_permission_id_foreign_key" REFERENCES permission ON DELETE CASCADE,
        CONSTRAINT "permissions_by_roles_primary_key" PRIMARY KEY ("role_id", "permission_id")
      );
      CREATE INDEX "permissions_by_roles_role_id_index"
        ON permissions_by_roles ("roleId");
      CREATE INDEX "permissions_by_roles_permission_id_index"
        ON permissions_by_roles ("permissionId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE permissions_by_roles;
    `);
  }
}




