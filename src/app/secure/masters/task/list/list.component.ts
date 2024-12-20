import { Component } from '@angular/core';
import { Tasks } from 'src/app/model/tasks';
import { ApplicationPage, PermissionType } from '@app-core';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class TaskListComponent {

  taskData: any = {};
  pageNumber: number = 0;
  pageType: string = ApplicationPage.tasks;
  permissions = PermissionType;
  isActive: boolean;
  error: string;
  loading: boolean;
  routerSub: Subscription;
  activityId: number;
  //page = 0;
  totalElements = 0;

  searchData: { [key: string]: any } = {
      isActive: false
  };

  IsAddPemission: boolean = false;
  IsEditPermission: boolean = false;
  IsDeletePermission: boolean = false;

  pageIndex: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private taskService: TaskService, private notificationService: ToastrService,
      private permissionService: PermissionService,private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
      // this.IsAddPemission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Add');
      // this.IsEditPermission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Edit');
      // this.IsDeletePermission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Delete');
      //
       this.getTasksData();
  }
  private getTasksData() {
    this.routerSub = this.activatedRoute.params.subscribe((params) => {
      //this.isEditMode = !CommonUtility.isEmpty(params["id"]);
     // this.createForm();
      // if (this.isEditMode) {
        this.activityId = params.id;
        this.getTasksDetailsById();
      // }
    });
  }

  // private getTasksDetailsById() {
  //   this.loading = true;
  //   this.taskService.getTasksById(this.activityId,this.pageIndex,this.pageSize)
  //     .subscribe((result: any) => {
  //       console.log('API Response:', result);
  //       this.taskData = result;
  //       this.totalItems = result.totalCount;
  //       this.loading = false;

  //     }, (error) => {
  //         console.log(error);
  //         this.loading = false;

  //     });
  // }
  private getTasksDetailsById(): void {
   // debugger
    this.loading = true;
    this.taskService.getTasksById(this.activityId, this.pageIndex, this.pageSize).subscribe(
      (result: any) => {
        console.log('API Response:', result);
       // debugger
        this.taskData = result;
        this.totalItems = result.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getTasksDetailsById();
    }
  }

  previousPage(): void {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getTasksDetailsById();
    }
  }

  isActiveRow(row) {
      return {
          'text-dark': !row.isActive
      };
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
  // Function to download the attachment
  downloadAttachment(attachment: any, id: number): void {
    this.taskService.downloadFile(id, attachment.fileName);
  }
  setPage(pageInfo: any) {
    this.pageNumber = pageInfo.offset;
    // Implement your API call here to fetch data with pagination
    this.loadData();
  }
  loadData() {
    // Example API call with pagination
    this.loading = true;
    this.taskService.getTaskData(this.pageNumber, 10).subscribe(
      (response: any) => {
        this.taskData = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error => {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    );
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex + 1; // ngx-datatable uses 0-based index
    this.getTasksData();
}
}
