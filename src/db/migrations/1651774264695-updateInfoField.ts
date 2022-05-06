import { MigrationInterface, QueryRunner } from "typeorm";

export class updateInfoField1651774264695 implements MigrationInterface {
    name = 'updateInfoField1651774264695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "REL_45315c9d8c41766047ec66ca19"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "REL_45315c9d8c41766047ec66ca19" UNIQUE ("infoId")`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
