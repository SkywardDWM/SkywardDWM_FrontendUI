import { BaseAuditable } from "./base-auditable";
import { Permission } from "./permission";

export class FailedUserImport{
    userName: string;
    errors: string[];
}