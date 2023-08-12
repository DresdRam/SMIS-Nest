import { IsNumber } from "class-validator";
import { GateLog } from "../entity/gate.entity";

export class SoldierLogs {
    @IsNumber()
    totalIn: number;

    @IsNumber()
    totalOut: number;

    logs: GateLog[];
}