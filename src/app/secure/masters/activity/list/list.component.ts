import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from '../activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ActivityListComponent {

  activityData: any[] = [];
  taskId: any;
  loading: boolean;
  isActive: boolean;

  IsAddPemission: boolean = false;
  IsEditPermission: boolean = false;
  IsDeletePermission: boolean = false;
  pageNumber: number = 0;
  pageIndex: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  searchData: { [key: string]: any } = {};
    filteredActivityData: any[] = [];

  constructor(private notificationService: ToastrService, public activityService: ActivityService, public router: Router,
    private route: ActivatedRoute, private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.IsAddPemission = this.permissionService.hasPermission('Activity (PER_ACTIVITY) - Add');
    this.IsEditPermission = this.permissionService.hasPermission('Activity (PER_ACTIVITY) - Edit');
    this.IsDeletePermission = this.permissionService.hasPermission('Activity (PER_ACTIVITY) - Delete');
    this.getActivityData();
  }

  private getActivityData() {
    this.loading = true;
    this.activityService.getActivityList(this.pageIndex,this.pageSize)
      .subscribe((result: any) => {
        this.loading = false;
        // this.activityData = result;
        this.activityData = result.items; // Assuming the API response has an 'items' property
        this.filteredActivityData = result.items;
        this.totalItems = result.totalCount; // Assuming the API response has a 'totalCount' property
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    console.log("result---", this.activityData)
  }

  removeTask(id: number) {
    const result = confirm(`Are you sure, you want to delete this Activity?`);
    if (result) {
      this.activityService.DeleteActivity(id)
        .subscribe(() => {
          this.notificationService.error('Task deleted successfully!', '', {
            timeOut: 3000,
          });
          this.getActivityData();
        }, () => {
          this.notificationService.error("Something went wrong.");
        });
    }
  }
  isActiveRow(row) {
    return {
      'text-dark': !row.isActive
    };
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex + 1; // ngx-datatable uses 0-based index
    this.getActivityData();
  }

  // Method to update search results based on emitted data from the search panel
  updateSearch(search: { [key: string]: any }) {
    this.searchData = { ...search };  // Store the search data
    //console.log("searchdata", this.searchData);
    // Filtering logic based on code, poNumber, and status
    this.filteredActivityData = this.activityData.filter(order => {
        const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
        const matchescode = order.code.toLowerCase().includes(searchText);
        const matchesname = order.name.toLowerCase().includes(searchText);
        const matchesdescription = order.description.toLowerCase().includes(searchText);
        const matchepriority = order.priority.toLowerCase().includes(searchText);

        // Combine all search filters
        return (matchescode || matchesname || matchesdescription || matchepriority);
    });
}
}
