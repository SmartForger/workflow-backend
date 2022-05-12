import { MigrationInterface, QueryRunner } from "typeorm";

export class updateWorkflowWidget1652356454750 implements MigrationInterface {
    name = 'updateWorkflowWidget1652356454750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP COLUMN "updateEvent"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD "event" character varying`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "iconFileName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "field" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "field" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "iconFileName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "icon" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP COLUMN "event"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD "updateEvent" character varying NOT NULL`);
    }

}
