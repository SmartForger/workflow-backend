import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1650615859817 implements MigrationInterface {
    name = 'initialMigration1650615859817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workflow_event" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "action" character varying NOT NULL, "condition" character varying NOT NULL, "stepId" character varying, CONSTRAINT "PK_bac71af50fca92a4b297a0daf78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_widget" ("id" character varying NOT NULL, "type" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying NOT NULL, "icon" character varying NOT NULL, "iconFileName" character varying NOT NULL, "field" character varying NOT NULL, "updateEvent" character varying NOT NULL, "stepId" character varying, "layoutId" character varying, CONSTRAINT "PK_35fba166562609bb51edfc81fe7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_layout" ("id" character varying NOT NULL, "title" character varying NOT NULL, "icon" character varying NOT NULL, "iconFileName" character varying NOT NULL, "backgroundColor" character varying NOT NULL, "textColor" character varying NOT NULL, "visible" boolean NOT NULL, "stepId" character varying, CONSTRAINT "PK_3b7703539f341aac734f707f15f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow_step" ("id" character varying NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying NOT NULL, "icon" character varying NOT NULL, "iconFileName" character varying NOT NULL, "workflowId" character varying, CONSTRAINT "PK_6c155e8aa140495dbf88eae4f4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow" ("id" character varying NOT NULL, "category" character varying NOT NULL, "subCategory" character varying NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying NOT NULL, "mode" character varying(1024) NOT NULL, "icon" character varying NOT NULL, "iconFileName" character varying NOT NULL, CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD CONSTRAINT "FK_830f898763a00a58d8d1f86fd3c" FOREIGN KEY ("stepId") REFERENCES "workflow_step"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD CONSTRAINT "FK_f100c1de5eeab2ebb6df447fc0f" FOREIGN KEY ("stepId") REFERENCES "workflow_step"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD CONSTRAINT "FK_4902c01a8514b56015c92bb70c8" FOREIGN KEY ("layoutId") REFERENCES "workflow_layout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ADD CONSTRAINT "FK_eab0eb20dd7b4cea636785ceed7" FOREIGN KEY ("stepId") REFERENCES "workflow_step"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ADD CONSTRAINT "FK_1ad97e48f44bfd1483b8f14b98a" FOREIGN KEY ("workflowId") REFERENCES "workflow"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_step" DROP CONSTRAINT "FK_1ad97e48f44bfd1483b8f14b98a"`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" DROP CONSTRAINT "FK_eab0eb20dd7b4cea636785ceed7"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP CONSTRAINT "FK_4902c01a8514b56015c92bb70c8"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP CONSTRAINT "FK_f100c1de5eeab2ebb6df447fc0f"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP CONSTRAINT "FK_830f898763a00a58d8d1f86fd3c"`);
        await queryRunner.query(`DROP TABLE "workflow"`);
        await queryRunner.query(`DROP TABLE "workflow_step"`);
        await queryRunner.query(`DROP TABLE "workflow_layout"`);
        await queryRunner.query(`DROP TABLE "workflow_widget"`);
        await queryRunner.query(`DROP TABLE "workflow_event"`);
    }

}
