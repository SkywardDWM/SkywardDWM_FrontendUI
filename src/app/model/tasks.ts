
import { Attachment } from "./attachment";
import { BaseAuditable } from "./base-auditable";
import { Permission } from "./permission";

export class Tasks extends BaseAuditable {
    id: number;
    createdDate : Date;
    status : string;
    value : string;
    comment : string;
    issueType : string;
    issue : string;
    unitOfMeasure : string;
    attachments : Attachment;
    activityName : string;
    frequency : string;
}