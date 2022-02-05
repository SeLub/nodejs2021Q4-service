import * as bcryptjs from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import {serverSettings} from '../config.js';

export class sqlQueries implements MigrationInterface {
  name = 'Tables1643722609592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "task" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "order" integer NOT NULL,
                "description" character varying NOT NULL,
                "userId" uuid,
                "boardId" uuid,
                "columnId" uuid,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "board" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "columns" jsonb NOT NULL,
                CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "login"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "login" text NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);

    const hash = await bcryptjs.hash('admin', parseInt(serverSettings.salt));
    await queryRunner.query(
      `INSERT INTO "user" (name, login, password) VALUES ('admin', 'admin', '${hash}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"
        `);
    await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "login"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "login" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "board"
        `);
    await queryRunner.query(`
            DROP TABLE "task"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}