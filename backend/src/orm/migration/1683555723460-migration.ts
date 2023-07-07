import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683555723460 implements MigrationInterface {
  name = "migration1683555723460";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userName" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'regular', "password" character varying NOT NULL, "bio" character varying, "profile_pic" character varying, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "story" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_28fce6873d61e2cace70a0f3361" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "story" ADD CONSTRAINT "FK_2f8345c3a6d1057ccf612e65a09" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "story" DROP CONSTRAINT "FK_2f8345c3a6d1057ccf612e65a09"`
    );
    await queryRunner.query(`DROP TABLE "story"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
