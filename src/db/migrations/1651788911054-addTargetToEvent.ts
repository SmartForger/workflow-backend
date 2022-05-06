import { MigrationInterface, QueryRunner } from "typeorm";

export class addTargetToEvent1651788911054 implements MigrationInterface {
    name = 'addTargetToEvent1651788911054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "targetId" character varying`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD CONSTRAINT "UQ_dce5f5df5c4ea5cc4644391b7a2" UNIQUE ("targetId")`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD CONSTRAINT "FK_dce5f5df5c4ea5cc4644391b7a2" FOREIGN KEY ("targetId") REFERENCES "workflow_step"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP CONSTRAINT "FK_dce5f5df5c4ea5cc4644391b7a2"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP CONSTRAINT "UQ_dce5f5df5c4ea5cc4644391b7a2"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "targetId"`);
    }

}
