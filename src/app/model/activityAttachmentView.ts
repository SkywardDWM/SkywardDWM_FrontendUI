import { BaseAuditable } from "./base-auditable";

export class ActivityAttachmentView extends BaseAuditable {
  id?: number;
  taskId?: number;
  fileName: string;
  filePath?: string;
  fileBase64: string;
 // fileSize: number;

}