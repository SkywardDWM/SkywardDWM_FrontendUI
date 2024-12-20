import { ActivityAttachmentView } from "./activityAttachmentView";
import { BaseAuditable } from "./base-auditable";

export class Activity extends BaseAuditable {
    id: number;
    code: string;
    name: number;
    description: number;
    priority : string;
    frequencyId: number;
    natureOfWorkId: number;
    uomId: number;
    plantId: number;
    departmentId: number;
    taskCreatedOn: Date;
    status : string;
    value : string;
    comment : string;
    issueType : string;
    issue : string;
    jobRoleId : number;
    filePath : string;
    fileName : string;
    attachments?: ActivityAttachmentView[];


}