import { BaseAuditable } from "./base-auditable";
import { Permission } from "./permission";

export class Holiday extends BaseAuditable {
    id: number;
    code: string;
    startDate: Date;
    endDate: Date;
    calendarName: string;
    remark: string;
    type: string;
    //holidayDate: Date;
    holidayName: string;
    plantId: string;
    plantIdList: any;
}