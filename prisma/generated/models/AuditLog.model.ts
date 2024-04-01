import { IsString, IsDefined, IsDate, IsOptional, IsIn } from "class-validator";
import { Executor, ExecutorIp, Entity } from "./";
import { getEnumValues } from "../helpers";
import { EventType } from "../enums";

export class AuditLog {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsOptional()
    @IsString()
    chainId?: string;

    @IsDefined()
    @IsString()
    executorId!: string;

    @IsOptional()
    @IsString()
    executorIpId?: string;

    @IsDefined()
    @IsString()
    entityId!: string;

    @IsOptional()
    @IsIn(getEnumValues(EventType))
    eventType?: EventType;

    @IsDefined()
    @IsString()
    note!: string;

    @IsOptional()
    @IsString()
    diffs?: string;

    @IsDefined()
    executor!: Executor;

    @IsOptional()
    executorIp?: ExecutorIp;

    @IsDefined()
    entity!: Entity;
}
