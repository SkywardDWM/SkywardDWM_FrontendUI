import { BaseAuditable } from "./base-auditable";

export class Plant extends BaseAuditable {
    id: number;
    plantName: string;
    alias: string;
    description: string;
    // Permissions: Permission[]
    // rolePermissions:Permission[]
    // assignedPermissions: any;
    // NormalizedName:string;
}