import { Component } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationPage, CommonUtility } from '@app-core';
import { Subscription } from 'rxjs';
import { ActivityAttachmentView } from 'src/app/model/activityAttachmentView';
import { ActivityService } from '../activity.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';
import { Activity } from 'src/app/model/activity';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class ActivityAddEditComponent {
  priorities: string[] = ['High', 'Medium', 'Low'];
  activityData: any;
  activityId: number;
  isEditMode: boolean;
  frmActivity: UntypedFormGroup;
  routerSub: Subscription
  isFormSubmitted: boolean;
  page: string = ApplicationPage.activity;
  error: string;
  frequencyList: any[] = [];
  natureOfWorkList: any[] = [];
  UOMList: any[] = [];
  plantsList: any[] = [];
  departmentList: any[] = [];
  jobRoleList: any[] = [];
  subscriptions: Subscription[] = [];


  IsViewPermission: boolean = false;
  attachments: ActivityAttachmentView[] = [];
  maxAttachments: number = 5; // Optional: Set a limit on attachments
  totalAttachmentSize: number = 0;
  MAX_TOTAL_SIZE: number = 50 * 1024 * 1024; // 50MB total file size limit


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private activityService: ActivityService,
    private notificationService: ToastrService,
    private permissionService: PermissionService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getActivityRoute();
    this.loadDropdowns();
    this.IsViewPermission = this.permissionService.hasPermission('Activity (PER_ACTIVITY) - View');
  }

  private loadDropdowns() {

    this.activityService.getFrequenciesList()
      .subscribe((result: any) => {
        this.frequencyList = result;
      });
    this.activityService.getNatureOfWorksList()
      .subscribe((result: any) => {
        this.natureOfWorkList = result;
      });
    this.activityService.getUnitOfMeasuresList()
      .subscribe((result: any) => {
        this.UOMList = result;
      });
    this.activityService.getPlantsList()
      .subscribe((result: any) => {
        this.plantsList = result;
      });
    this.activityService.getdepartmentsList()
      .subscribe((result: any) => {
        this.departmentList = result;
      });
    this.activityService.getJobRole()
      .subscribe((result: any) => {
        this.jobRoleList = result;
      });
  }
  private getActivityRoute() {
    this.routerSub = this.activatedRoute.params.subscribe((params) => {
      this.isEditMode = !CommonUtility.isEmpty(params["id"]);
      this.createForm();
      if (this.isEditMode) {
        this.activityId = params.id;
        this.getActivityDetailsById();
      }
    });
  }

  private getActivityDetailsById() {
    this.activityService.getActivityById(this.activityId)
      .subscribe((result: any) => {
        this.activityData = result;
        this.setTaskData();
      },
        (error) => {
          console.error(error);
          this.notificationService.error("Error fetching role details: " + error.message);
        });
  }

  private setTaskData() {
    this.frmActivity.patchValue({
      id: [this.activityId || 0],
      code: this.activityData.code,
      name: this.activityData.name,
      description: this.activityData.description,
      priority: this.activityData.priority,
      frequencyId: this.activityData.frequencyId,
      natureOfWorkId: this.activityData.natureOfWorkId,
      uomId: this.activityData.uomId,
      plantId: this.activityData.plantId,
      departmentId: this.activityData.departmentId,
      taskCreatedOn: this.activityData.taskCreatedOn,
      jobRoleId: this.activityData.jobRoleId,

    });

    // Handling the attachments part for editing
    if (this.activityData.attachments && this.activityData.attachments.length > 0) {
      this.attachments = this.activityData.attachments.map(attachment => ({
        fileName: attachment.fileName,
        filePath: attachment.filePath
      }));
    }
  }

  createForm() {
    this.frmActivity = this.formBuilder.group({
      code: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      frequencyId: ['', [Validators.required]],
      natureOfWorkId: ['', [Validators.required]],
      uomId: ['', [Validators.required]],
      plantId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      taskCreatedOn: ['', [Validators.required]],
      jobRoleId: ['', [Validators.required]],
      attachments: this.formBuilder.array([]) // Create a form array for attachments

    });
  }

  cancel() {
    if (this.isEditMode) {
      this.router.navigate(['../..', 'list'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['..', 'list'], { relativeTo: this.activatedRoute });
    }
  }

  save() {
    if (this.frmActivity.invalid) {
      this.isFormSubmitted = true;
      return;
    }
    if (this.isEditMode) {
      this.updateActivity();
    } else {
      this.addActivity();
    }
  }
  addActivity() {
   
    const activityData: Activity = {
      ...this.frmActivity.value,
      attachments: this.attachments,
    };
  
    this.activityService.addActivity(activityData).subscribe(
      (response) => {
        this.attachments = [];
        this.totalAttachmentSize = 0;
        const attachmentsFormArray = this.frmActivity.get('attachments') as FormArray;
        attachmentsFormArray.clear();
  
        this.cancel();
        this.notificationService.success('Task saved successfully');
      },
      (error) => {
        this.error = error;
  
        // Check if the error response contains information about fileName or a specific error message
        const errorMessage = error.message || 'An unknown error occurred';
        const fileName = this.attachments.length > 0 ? this.attachments[0].fileName : 'unknown file';
  
        this.notificationService.error(`File "${fileName}" might be too large. Maximum allowed size is 10MB.`);
      }
    );
  }
  


  updateActivity() {
  
    // Identify the original attachments before modifications
    const originalAttachments = [...this.attachments];

    // Create the activity object with updated attachments
    const activity: Activity = {
      ...this.frmActivity.value,
      id: this.activityId,
      attachments: this.attachments.map((attachment) => {
        console.log('Current Attachment:', attachment);
        console.log('Original Attachments:', originalAttachments);
        // For new attachments, set ID to 0
        if (!attachment.id) {
          attachment.id = 0;
        }

        // Check if this attachment was in the original list
        const originalAttachment = originalAttachments.find(
          orig => orig.fileName === attachment.fileName
        );
        console.log('Matching Original Attachment:', originalAttachment);

        // If the attachment was in the original list but is now missing, mark as inactive
        if (!originalAttachment) {
          return {
            ...attachment,
            isActive: false  // Explicitly mark as inactive
          };
        }

        return {
          ...attachment,
          isActive: true  // Set to true for all existing files
        };
      })
    }

    console.log('Activity Data:', activity);

    // Call the backend service to update the activity
    this.activityService.updateActivity(activity).subscribe(
      (response) => {
        // Clear attachments and form if the activity is successfully updated
        this.attachments = [];
        this.totalAttachmentSize = 0;
        const attachmentsFormArray = this.frmActivity.get('attachments') as FormArray;
        attachmentsFormArray.clear();
        this.cancel(); // Close the form after successful update
        this.notificationService.success('Task updated successfully');
      },
      (error) => {
        // Handle errors
        const errorMessage = error.message || 'An unknown error occurred';
        const fileName = this.attachments.length > 0 ? this.attachments[0].fileName : 'unknown file';
  
        this.notificationService.error(
          `Error updating Activity: ${errorMessage}. File "${fileName}" might be too large. Maximum allowed size is 10MB.`
        );
      }
    );
  }

  dataURItoBlob(dataURI: string): Blob {
    try {
      const byteString = atob(dataURI.split(',')[1]);  // Decode Base64 string
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // Get mime type
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const view = new Uint8Array(arrayBuffer);
      
      // Create Blob
      for (let i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i);
      }
      
      return new Blob([arrayBuffer], { type: mimeString });
    } catch (error) {
      console.error('Error in dataURItoBlob function:', error);
      throw new Error('Invalid Base64 string or Blob conversion failed.');
    }
  }




  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;

  //   if (files.length > 0) {
  //     this.processFiles(files).then(() => {
  //       this.notificationService.success('Files processed successfully');
  //     }).catch((error) => {
  //       this.notificationService.error('Error processing files');
  //     });
  //   } else {
  //     this.notificationService.error('No files selected');
  //   }
  // }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    const maxFileSize = 10 * 1024 * 1024; // 10 MB
  
    if (files.length > 0) {
      // Loop through the selected files to check their sizes
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        // If file size is larger than maxFileSize, show an error and stop processing
        if (file.size > maxFileSize) {
          this.notificationService.error(`File "${file.name}" is too large. Maximum allowed size is 10MB.`);
          return; // Stop further processing if a file is too large
        }
      }
  
      // If files are valid, process them
      this.processFiles(files).then(() => {
        this.notificationService.success('Files processed successfully');
      }).catch((error) => {
        this.notificationService.error('Error processing files');
      });
    } else {
      this.notificationService.error('No files selected');
    }
  }


  private async processFiles(files: FileList) {
    const newAttachments: ActivityAttachmentView[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size
      if (file.size > 10 * 1024 * 1024) {
        this.notificationService.error(`File ${file.name} exceeds 10MB limit`);
        continue;
      }

      // Check for duplicates more robustly
      if (this.attachments.some(att => att.fileName === file.name)) {
        this.notificationService.error(`File ${file.name} is already added.`);
        continue;
      }

      try {
        const base64String = await this.convertToBase64(file);
        const attachment: ActivityAttachmentView = {
          fileName: file.name,
          filePath: base64String.split(',')[1],
          fileBase64: base64String.split(',')[1],
          isActive: true  // Explicitly set active flag
        };

        newAttachments.push(attachment);

        const attachmentFormGroup = this.formBuilder.group({
          fileName: [attachment.fileName],
          filePath: [attachment.fileBase64],
          fileBase64: [attachment.fileBase64],
          isActive: [true]
        });

        (this.frmActivity.get('attachments') as FormArray).push(attachmentFormGroup);
      } catch (error) {
        this.notificationService.error(`Error processing file: ${file.name}`);
      }
    }

    // Merge new attachments with existing
    this.attachments = [...this.attachments, ...newAttachments];
    // this.totalAttachmentSize += newAttachments.reduce((sum, att) => sum + att.fileSize, 0);
  }
  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Could not read file'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  removeAttachment(index: number) {
    // Remove from attachments array
    const removedAttachment = this.attachments[index];
    this.attachments.splice(index, 1);

    const attachmentsFormArray = this.frmActivity.get('attachments') as FormArray;
    attachmentsFormArray.removeAt(index);
  }

  // Assuming the download endpoint and necessary logic in activityService
  downloadAttachment(attachment: any, activityId: number): void {
    const idToUse = activityId || this.activityId; // Fallback to global activityId
    console.log("activityId----download---", activityId)
    this.activityService.downloadFile(idToUse, attachment.fileName);
  }
  getFileIcon(fileName: string): string {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    switch (fileExtension) {
      case 'pdf':
        return 'fa fa-file-pdf-o'; // Font Awesome PDF icon
      case 'doc':
      case 'docx':
        return 'fa fa-file-word-o'; // Word file icon
      case 'xls':
      case 'xlsx':
        return 'fa fa-file-excel-o'; // Excel file icon
      case 'jpg':
      case 'png':
      case 'jpeg':
        return 'fa fa-file-image-o'; // Image file icon
      case 'zip':
      case 'rar':
        return 'fa fa-file-archive-o'; // Archive file icon
      default:
        return 'fa fa-file-o'; // Default file icon
    }
  }

}
