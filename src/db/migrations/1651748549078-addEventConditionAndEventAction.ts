import { MigrationInterface, QueryRunner } from "typeorm";

export class addEventConditionAndEventAction1651748549078 implements MigrationInterface {
    name = 'addEventConditionAndEventAction1651748549078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workflow_event_action" ("id" character varying NOT NULL, "infoId" character varying, "eventId" character varying, CONSTRAINT "REL_45315c9d8c41766047ec66ca19" UNIQUE ("infoId"), CONSTRAINT "PK_f46e511c6b50ac8d1aedcc81797" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_event_condition" ("id" character varying NOT NULL, "name" character varying NOT NULL, "filterJson" character varying NOT NULL, "eventId" character varying, CONSTRAINT "PK_f40f447de14e1811a5fa99cc177" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "condition"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_7504e18cfe16220a959acb83f17" FOREIGN KEY ("eventId") REFERENCES "workflow_event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" ADD CONSTRAINT "FK_46b2048744b1f204e6a5773f4a0" FOREIGN KEY ("eventId") REFERENCES "workflow_event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" DROP CONSTRAINT "FK_46b2048744b1f204e6a5773f4a0"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_7504e18cfe16220a959acb83f17"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "condition" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "action" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "workflow_event_condition"`);
        await queryRunner.query(`DROP TABLE "workflow_event_action"`);
    }

}
