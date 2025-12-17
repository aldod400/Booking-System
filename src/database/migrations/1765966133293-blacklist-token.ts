import { MigrationInterface, QueryRunner } from "typeorm";

export class BlacklistToken1765966133293 implements MigrationInterface {
    name = 'BlacklistToken1765966133293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklisted_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, CONSTRAINT "UQ_2b8c5de96ce5460b558e94f1505" UNIQUE ("token"), CONSTRAINT "PK_8fb1bc7333c3b9f249f9feaa55d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blacklisted_tokens"`);
    }

}
