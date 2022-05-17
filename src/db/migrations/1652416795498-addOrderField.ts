import { MigrationInterface, QueryRunner } from "typeorm";

export class addOrderField1652416795498 implements MigrationInterface {
    name = 'addOrderField1652416795498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "workflow_step" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "workflow_event" ADD "order" integer`);
        await queryRunner.query(`ALTER TABLE "workflow_event_action" ADD "order" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_event_action" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_event" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_step" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_layout" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_widget" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "workflow_event_condition" DROP COLUMN "order"`);
    }

}
