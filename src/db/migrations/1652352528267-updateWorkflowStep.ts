import { MigrationInterface, QueryRunner } from "typeorm";

export class updateWorkflowStep1652352528267 implements MigrationInterface {
    name = 'updateWorkflowStep1652352528267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "iconFileName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "iconFileName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "icon" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ALTER COLUMN "description" SET NOT NULL`);
    }

}
