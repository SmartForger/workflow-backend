import { MigrationInterface, QueryRunner } from "typeorm";

export class updateWorkflow1652351816632 implements MigrationInterface {
    name = 'updateWorkflow1652351816632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "mode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "iconFileName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "iconFileName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "icon" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "mode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ALTER COLUMN "description" SET NOT NULL`);
    }

}
