import { MigrationInterface, QueryRunner } from "typeorm";

export class addExtraToWidget1652951747293 implements MigrationInterface {
    name = 'addExtraToWidget1652951747293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD "extra" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP COLUMN "extra"`);
    }

}
