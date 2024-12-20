import { Component, OnInit } from '@angular/core';
import { ApplicationPage, PermissionType } from '@app-core';
import { User } from '@app-models';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
 
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
    
})
export class UserListComponent implements OnInit {
    userData: any[] = [];
    page: string = ApplicationPage.user;
    permissions = PermissionType;
    loading: boolean;
    isActive: boolean;

    // Pagination variables
    pageIndex: number = 1;
    pageSize: number = 10;
    totalItems: number = 0;

    IsAddPemission: boolean = false;
    IsEditPermission: boolean = false;
    IsDeletePermission: boolean = false;

    searchData: { [key: string]: any } = {};
    filtereduserData :any[] = [];

    constructor(private userService: UserService, private notificationService: ToastrService,
        private permissionService: PermissionService
    ) { }

    ngOnInit(): void {
        this.IsAddPemission = this.permissionService.hasPermission('User (PER_USER) - Add');
        this.IsEditPermission = this.permissionService.hasPermission('User (PER_USER) - Edit');
        this.IsDeletePermission = this.permissionService.hasPermission('User (PER_USER) - Delete');
        this.getUserData();
    }

    private getUserData() {
        this.loading = true;

        this.userService.getUsers(this.pageIndex, this.pageSize)
            .subscribe((result: any) => {
                this.loading = false;
                this.userData = result.items; // Assuming the API response has an 'items' property
                this.filtereduserData = result.items;
                this.totalItems = result.totalCount; // Assuming the API response has a 'totalCount' property
            }, (error) => {
                this.loading = false;
                console.log(error);
            });
    }

    // Update the pageIndex and fetch data when user navigates through pages
    onPageChange(event: any) {
        this.pageIndex = event.pageIndex + 1; // ngx-datatable uses 0-based index
        this.getUserData();
    }

    getRoles(roles: any) {
        return roles.map((item: any) => item.roleName).join(', ');
    }

    isActiveRow(row) {
        return {
            'text-danger': !row.isActive
        };
    }

    toggleActivate(townId: number) {
        const result = confirm(`Are you sure you want to delete User ?`);
        if (result) {
            this.userService.deleteUser(townId)
                .subscribe((result) => {
                    if (result) {
                        this.getUserData();
                        this.notificationService.error("User Deleted Successfully");
                    }
                    else {
                        this.notificationService.warning(result.message);
                    }
                }, (error) => {
                    this.notificationService.error("Something went wrong.");
                });
        }
    }

    // Method to update search results based on emitted data from the search panel
  updateSearch(search: { [key: string]: any }) {
    this.searchData = { ...search };  // Store the search data
//console.log("searchdata", this.searchData);
    // Filtering logic based on code, poNumber, and status
    this.filtereduserData = this.userData.filter(order => {
      const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
      const matchesuserName = order.userName.toLowerCase().includes(searchText);
      const matchesemail = order.email?.toLowerCase().includes(searchText);
      const matchesphoneNumber = order.phoneNumber?.toString().includes(searchText);
     const formattedDate = new Date(order.createdDate).toLocaleDateString(); // You can customize the format as needed
     const matchesDate = formattedDate.includes(searchText);

      // Combine all search filters
      return (matchesuserName || matchesemail || matchesphoneNumber || matchesDate ) ;
    });
  }
}
