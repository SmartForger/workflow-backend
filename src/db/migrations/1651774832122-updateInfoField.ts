import { MigrationInterface, QueryRunner } from "typeorm";

export class updateInfoField1651774832122 implements MigrationInterface {
    name = 'updateInfoField1651774832122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
