import { MigrationInterface, QueryRunner } from "typeorm";

export class addLayoutType1652294337088 implements MigrationInterface {
    name = 'addLayoutType1652294337088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workflow_layout_type_enum" AS ENUM('header', 'footer')`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ADD "type" "public"."workflow_layout_type_enum" NOT NULL DEFAULT 'header'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_layout" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."workflow_layout_type_enum"`);
    }

}
