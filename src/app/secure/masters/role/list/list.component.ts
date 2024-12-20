import { Component, OnInit } from '@angular/core';
import { ApplicationPage, PermissionType } from '@app-core';
import { Role } from '@app-models';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../role.service';
import { PermissionService } from 'src/app/core/service/permission.service';


@Component({
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class RoleListComponent implements OnInit {
    // activateToggleRole(_t27: any,arg1: boolean) {
    // throw new Error('Method not implemented.');
    // }

    roleData: any[] = [];
    page: string = ApplicationPage.role;
    permissions = PermissionType;
    isActive: boolean;
    error: string;
    loading: boolean;

    IsAddPemission: boolean = false;
    IsEditPermission: boolean = false;
    IsDeletePermission: boolean = false;

    searchData: { [key: string]: any } = {};
    filteredRoleData: any[] = [];

    constructor(private roleService: RoleService, private notificationService: ToastrService,
        private permissionService: PermissionService
    ) {

    }

    ngOnInit(): void {
        this.IsAddPemission = this.permissionService.hasPermission('Role (PER_ROLE) - Add');
        this.IsEditPermission = this.permissionService.hasPermission('Role (PER_ROLE) - Edit');
        this.IsDeletePermission = this.permissionService.hasPermission('Role (PER_ROLE) - Delete');
        this.getRoleData();
    }

    private getRoleData() {
        this.loading = true;

        this.roleService.getRole()
            .subscribe((result: any) => {
                this.roleData = result;
                this.filteredRoleData = result;
                this.loading = false;

            }, (error) => {
                console.log(error);
                this.loading = false;

            });
    }

    removeRole(id: number) {
        const result = confirm(`Are you sure, you want to delete this role?`);
        if (result) {
            this.roleService.deleteRole(id)
                .subscribe(() => {
                    this.getRoleData();
                    this.notificationService.error("Role Deleted Successfully");
                }, () => {
                    this.notificationService.error("Something went wrong.");
                });
        }
    }

    // activateToggleRole(role: Role, isActive: boolean) {
    //     const result = confirm(`Are you sure you want to ${isActive ? 'Activate' : 'Deactivate'} this role?`);
    //     if (result) {
    //         this.roleService.toggleActivate(role.id, isActive)
    //             .subscribe(() => {
    //                 this.getRoleData(); // Refresh data
    //                 this.notificationService.success(`Role ${isActive ? 'activated' : 'deactivated'} successfully.`);
    //             }, () => {
    //                 this.notificationService.error("Something went wrong.");
    //             });
    //     }
    // }

    removeRolePermission(id: number) {
        const result = confirm(`Are you sure, you want to delete this Weight Check?`);
        if (result) {
            this.roleService.deleteRole(id)
                .subscribe(() => {
                    this.getRoleData();
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

    // Method to update search results based on emitted data from the search panel
    updateSearch(search: { [key: string]: any }) {
        this.searchData = { ...search };  // Store the search data
       // console.log("searchdata", this.searchData);
        // Filtering logic based on code, poNumber, and status
        this.filteredRoleData = this.roleData.filter(order => {
            const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
            const matchesname = order.name.toLowerCase().includes(searchText);
            

            // Combine all search filters
            return (matchesname );
        });
    }
}
