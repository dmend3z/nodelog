-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CREATE', 'ACCESS', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "executors" (
    "executor_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" UUID,

    CONSTRAINT "executors_pkey" PRIMARY KEY ("executor_id")
);

-- CreateTable
CREATE TABLE "executors_ips" (
    "executor_ip_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "executor_id" UUID NOT NULL,
    "ip" VARCHAR(40),

    CONSTRAINT "executors_ips_pkey" PRIMARY KEY ("executor_ip_id")
);

-- CreateTable
CREATE TABLE "entity" (
    "entity_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "entity_fqcn" UUID,
    "entity_name" UUID,

    CONSTRAINT "entity_pkey" PRIMARY KEY ("entity_id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "audit_log_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chain_id" UUID,
    "executor_id" UUID NOT NULL,
    "executor_ip_id" UUID,
    "entity_id" UUID NOT NULL,
    "event_type" "EventType",
    "note" TEXT NOT NULL,
    "diffs" TEXT,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("audit_log_id")
);

-- AddForeignKey
ALTER TABLE "executors_ips" ADD CONSTRAINT "executors_ips_executor_id_fkey" FOREIGN KEY ("executor_id") REFERENCES "executors"("executor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_executor_id_fkey" FOREIGN KEY ("executor_id") REFERENCES "executors"("executor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_executor_ip_id_fkey" FOREIGN KEY ("executor_ip_id") REFERENCES "executors_ips"("executor_ip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "entity"("entity_id") ON DELETE CASCADE ON UPDATE CASCADE;
