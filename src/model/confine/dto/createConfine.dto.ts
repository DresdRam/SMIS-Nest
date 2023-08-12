import { IsBoolean, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateConfine {
  @IsNumber()
  soldier_id: number;

  @IsBoolean()
  imprisoned: boolean;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  @ValidateIf((value) => value == null)
  reason: string;

  @IsString()
  @ValidateIf((value) => value == null)
  prison_reason: string | null;
}