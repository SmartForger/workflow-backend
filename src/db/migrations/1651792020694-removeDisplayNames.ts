import { MigrationInterface, QueryRunner } from "typeorm";

export class removeDisplayNames1651792020694 implements MigrationInterface {
    name = 'removeDisplayNames1651792020694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" RENAME COLUMN "displayName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "workflow_step" DROP COLUMN "displayName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_step" ADD "displayName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD "displayName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" RENAME COLUMN "name" TO "displayName"`);
    }

}
