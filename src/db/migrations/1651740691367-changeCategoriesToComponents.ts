import { MigrationInterface, QueryRunner } from "typeorm";

export class changeCategoriesToComponents1651740691367 implements MigrationInterface {
    name = 'changeCategoriesToComponents1651740691367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_action" RENAME COLUMN "categories" TO "components"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workflow_action" RENAME COLUMN "components" TO "categories"`);
    }

}
