import { MigrationInterface, QueryRunner } from "typeorm";

export class addWorkflowAction1651692610477 implements MigrationInterface {
    name = 'addWorkflowAction1651692610477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."workflow_action_type_enum" AS ENUM('transaction', 'milestone')`);
        await queryRunner.query(`CREATE TABLE "workflow_action" ("id" character varying NOT NULL, "type" "public"."workflow_action_type_enum" NOT NULL DEFAULT 'milestone', "name" character varying NOT NULL, "code" character varying NOT NULL, "content" character varying NOT NULL, "categories" character varying(1024) NOT NULL, CONSTRAINT "PK_8b55a01cdedba3cf83dc7038a7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workflow_action"`);
        await queryRunner.query(`DROP TYPE "public"."workflow_action_type_enum"`);
    }

}
