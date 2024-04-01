import { IsString, IsDefined, IsDate, IsOptional } from "class-validator";
import { Executor, AuditLog } from "./";

export class ExecutorIp {
    @IsDefined()
    @IsString()
    executorIpId!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    @IsString()
    executorId!: string;

    @IsOptional()
    @IsString()
    ip?: string;

    @IsDefined()
    executor!: Executor;

    @IsDefined()
    auditLog!: AuditLog[];
}
