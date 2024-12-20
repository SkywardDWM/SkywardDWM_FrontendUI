import { BaseAuditable } from "./base-auditable";
import { Permission } from "./permission";

export class Department extends BaseAuditable {
    id: number;
    departmentName: string;
    hodUserID: number;
    alias:string;
    plantId: number;
    userName:string;
    plantName:string;
}