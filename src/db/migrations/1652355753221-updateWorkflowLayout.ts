import { MigrationInterface, QueryRunner } from "typeorm";

export class updateWorkflowLayout1652355753221 implements MigrationInterface {
    name = 'updateWorkflowLayout1652355753221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_layout" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "iconFileName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "backgroundColor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "textColor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "visible" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "visible" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "textColor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "backgroundColor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "iconFileName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ALTER COLUMN "icon" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ADD "title" character varying NOT NULL`);
    }

}
