import { BaseAuditable } from "./base-auditable";
import { FailedUserImport } from "./FailedUserImport";
import { Permission } from "./permission";

export class BulkUploadResponse {
    successCount: number;
    failedUsers: FailedUserImport[];
    message?: string;
}