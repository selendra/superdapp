module.exports = class Data1696994540748 {
    name = 'Data1696994540748'

    async up(db) {
        await db.query(`CREATE TABLE "evm_contract" ("id" character varying NOT NULL, "bytecode" text NOT NULL, "bytecode_context" text NOT NULL, "bytecode_arguments" text NOT NULL, "gas_limit" numeric NOT NULL, "storage_limit" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "extrinsic_id" character varying, "signer_id" character varying, CONSTRAINT "PK_b96d2e55892972f43bab117bf13" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_afe28a5e71815101d97b1f64ac" ON "evm_contract" ("signer_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_6672be045a210e2d1e0b345c51" ON "evm_contract" ("extrinsic_id", "id") `)
        await db.query(`ALTER TABLE "account" ADD "evm_address" text`)
        await db.query(`ALTER TABLE "account" ADD "free_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "locked_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "available_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "reserved_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "vested_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "voting_balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "account" ADD "updated_at" numeric NOT NULL`)
        await db.query(`CREATE INDEX "IDX_22bbd4c1019b6727a8c0660b87" ON "account" ("evm_address") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_c7fe67b0a7b07c7e592fdb4763" ON "account" ("free_balance", "id") `)
        await db.query(`ALTER TABLE "evm_contract" ADD CONSTRAINT "FK_ab55b9b710014620e6a07c375bc" FOREIGN KEY ("extrinsic_id") REFERENCES "extrinsic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "evm_contract" ADD CONSTRAINT "FK_afe28a5e71815101d97b1f64ac4" FOREIGN KEY ("signer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "evm_contract"`)
        await db.query(`DROP INDEX "public"."IDX_afe28a5e71815101d97b1f64ac"`)
        await db.query(`DROP INDEX "public"."IDX_6672be045a210e2d1e0b345c51"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "evm_address"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "free_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "locked_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "available_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "reserved_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "vested_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "voting_balance"`)
        await db.query(`ALTER TABLE "account" DROP COLUMN "updated_at"`)
        await db.query(`DROP INDEX "public"."IDX_22bbd4c1019b6727a8c0660b87"`)
        await db.query(`DROP INDEX "public"."IDX_c7fe67b0a7b07c7e592fdb4763"`)
        await db.query(`ALTER TABLE "evm_contract" DROP CONSTRAINT "FK_ab55b9b710014620e6a07c375bc"`)
        await db.query(`ALTER TABLE "evm_contract" DROP CONSTRAINT "FK_afe28a5e71815101d97b1f64ac4"`)
    }
}
