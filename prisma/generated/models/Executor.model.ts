import { IsString, IsDefined, IsDate, IsOptional } from "class-validator";
import { AuditLog, ExecutorIp } from "./";

export class Executor {
    @IsDefined()
    @IsString()
    executorId!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsString()
    name?: string;

    @IsDefined()
    auditLog!: AuditLog[];

    @IsDefined()
    executorIp!: ExecutorIp[];
}
