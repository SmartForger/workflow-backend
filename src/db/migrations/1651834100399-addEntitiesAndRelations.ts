import { MigrationInterface, QueryRunner } from "typeorm";

export class addEntitiesAndRelations1651834100399 implements MigrationInterface {
    name = 'addEntitiesAndRelations1651834100399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_widget" RENAME COLUMN "displayName" TO "name"`);
        await queryRunner.query(`CREATE TABLE "workflow_event_condition" ("id" character varying NOT NULL, "name" character varying NOT NULL, "filterJson" character varying NOT NULL, "eventId" character varying, CONSTRAINT "PK_f40f447de14e1811a5fa99cc177" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_event_action" ("id" character varying NOT NULL, "infoId" character varying, "eventId" character varying, CONSTRAINT "PK_f46e511c6b50ac8d1aedcc81797" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_action" ("id" character varying NOT NULL, "type" "public"."workflow_action_type_enum" NOT NULL DEFAULT 'milestone', "name" character varying NOT NULL, "code" character varying NOT NULL, "content" character varying NOT NULL, "components" character varying(1024) NOT NULL, CONSTRAINT "PK_8b55a01cdedba3cf83dc7038a7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workflow" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "workflow_step" DROP COLUMN "displayName"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "condition"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "targetId" character varying`);
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" ADD CONSTRAINT "FK_46b2048744b1f204e6a5773f4a0" FOREIGN KEY ("eventId") REFERENCES "workflow_event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD CONSTRAINT "FK_dce5f5df5c4ea5cc4644391b7a2" FOREIGN KEY ("targetId") REFERENCES "workflow_step"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_45315c9d8c41766047ec66ca190" FOREIGN KEY ("infoId") REFERENCES "workflow_action"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD CONSTRAINT "FK_7504e18cfe16220a959acb83f17" FOREIGN KEY ("eventId") REFERENCES "workflow_event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_7504e18cfe16220a959acb83f17"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP CONSTRAINT "FK_45315c9d8c41766047ec66ca190"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP CONSTRAINT "FK_dce5f5df5c4ea5cc4644391b7a2"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" DROP CONSTRAINT "FK_46b2048744b1f204e6a5773f4a0"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "targetId"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "condition" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "action" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ADD "displayName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workflow" ADD "displayName" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "workflow_action"`);
        await queryRunner.query(`DROP TABLE "workflow_event_action"`);
        await queryRunner.query(`DROP TABLE "workflow_event_condition"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" RENAME COLUMN "name" TO "displayName"`);
    }

}
