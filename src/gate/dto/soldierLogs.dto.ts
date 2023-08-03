import { IsNumber } from "class-validator";
import { GateLog } from "../gate.entity";

export class SoldierLogs {
    @IsNumber()
    totalIn: number;

    @IsNumber()
    totalOut: number;

    logs: GateLog[];
}