import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1766856837861 implements MigrationInterface {
    name = 'Init1766856837861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "slots" ("id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "is_available" boolean NOT NULL DEFAULT true, "provider_id" integer NOT NULL, CONSTRAINT "PK_8b553bb1941663b63fd38405e42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" SERIAL NOT NULL, "bio" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "user_id" integer NOT NULL, CONSTRAINT "UQ_842a46f6b0079a69520561eeb62" UNIQUE ("user_id"), CONSTRAINT "REL_842a46f6b0079a69520561eeb6" UNIQUE ("user_id"), CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "slot_id" integer NOT NULL, "user_id" integer NOT NULL, "provider_id" integer NOT NULL, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "isActive" boolean NOT NULL DEFAULT true, "avatar" character varying, "isVerified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "blacklisted_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP, CONSTRAINT "UQ_2b8c5de96ce5460b558e94f1505" UNIQUE ("token"), CONSTRAINT "PK_8fb1bc7333c3b9f249f9feaa55d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "slots" ADD CONSTRAINT "FK_7a77d97562b7fe58593c3a3b2c7" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "providers" ADD CONSTRAINT "FK_842a46f6b0079a69520561eeb62" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_409d5b76fb2b0501a8c72dd4eeb" FOREIGN KEY ("slot_id") REFERENCES "slots"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_64cd97487c5c42806458ab5520c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_aae90d7b26a7414deb4029ca1b3" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_aae90d7b26a7414deb4029ca1b3"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_64cd97487c5c42806458ab5520c"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_409d5b76fb2b0501a8c72dd4eeb"`);
        await queryRunner.query(`ALTER TABLE "providers" DROP CONSTRAINT "FK_842a46f6b0079a69520561eeb62"`);
        await queryRunner.query(`ALTER TABLE "slots" DROP CONSTRAINT "FK_7a77d97562b7fe58593c3a3b2c7"`);
        await queryRunner.query(`DROP TABLE "blacklisted_tokens"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`DROP TABLE "slots"`);
    }

}
