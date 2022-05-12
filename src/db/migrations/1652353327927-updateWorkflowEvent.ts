import { MigrationInterface, QueryRunner } from "typeorm";

export class updateWorkflowEvent1652353327927 implements MigrationInterface {
    name = 'updateWorkflowEvent1652353327927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event" ALTER COLUMN "description" SET NOT NULL`);
    }

}
