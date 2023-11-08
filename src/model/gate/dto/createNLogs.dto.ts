import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateNLogs {

    @IsString()
    type: string;

    @IsNumber({}, {each: true})
    soldiers: number[];

    @IsString()
    sub_type: string;

    @IsString()
    section: string = "غير محدد";

    @IsBoolean()
    overtime: boolean = false;

    @IsString()
    time_section: string;

    @IsString()
    service_location: string;
}