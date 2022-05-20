import { MigrationInterface, QueryRunner } from "typeorm";

export class addRulesToWidget1652957356435 implements MigrationInterface {
    name = 'addRulesToWidget1652957356435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD "rules" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP COLUMN "rules"`);
    }

}
