import { IsString, IsDefined, IsDate, IsOptional } from "class-validator";
import { AuditLog } from "./";

export class Entity {
    @IsDefined()
    @IsString()
    entityId!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsString()
    entityFqcn?: string;

    @IsOptional()
    @IsString()
    entityName?: string;

    @IsDefined()
    auditLogs!: AuditLog[];
}
