import { Component, OnInit } from '@angular/core';
import { ApplicationPage, PermissionType } from '@app-core';
import { DepartmentService } from '../department.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';
import { Department } from 'src/app/model/department';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class DepartmentListComponent implements OnInit {
    departmentData: Department[] = [];
    page: string = ApplicationPage.department;
    permissions = PermissionType;
    isActive: boolean;
    error: string;
    loading: boolean;

    // searchData: { [key: string]: any } = {
    //     isActive: false
    // };
    searchData: { [key: string]: any } = {};
    filteredDepartmentData: any[] = [];

    IsAddPemission: boolean = false;
    IsEditPermission: boolean = false;
    IsDeletePermission: boolean = false;

    constructor(private departmentService: DepartmentService, private notificationService: ToastrService,
        private permissionService: PermissionService
    ) {

    }

    ngOnInit(): void {
        this.IsAddPemission = this.permissionService.hasPermission('Department (PER_DEPARTMENT) - Add');
        this.IsEditPermission = this.permissionService.hasPermission('Department (PER_DEPARTMENT) - Edit');
        this.IsDeletePermission = this.permissionService.hasPermission('Department (PER_DEPARTMENT) - Delete');
        this.getDepartmentData();
    }

    private getDepartmentData() {
        this.loading = true;
        this.departmentService.getDepartment()
            .subscribe((result: any) => {
                this.departmentData = result.map(department => ({
                    ...department,
                    alias: department.alias ? department.alias : '-'
                }));
                this.filteredDepartmentData = [...this.departmentData];
                this.loading = false;
            }, (error) => {
                console.log(error);
                this.loading = false;
            });
    }
    

    removeDepartment(id: number) {
        const result = confirm(`Are you sure, you want to delete this department?`);
        if (result) {
            this.departmentService.deleteDepartment(id)
                .subscribe(() => {
                    this.notificationService.error("Department deleted successfully.");
                    this.getDepartmentData();
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
        //console.log("searchdata", this.searchData);
        // Filtering logic based on code, poNumber, and status
        this.filteredDepartmentData = this.departmentData.filter(order => {
            const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
            const matchesdepartmentName = order.departmentName.toLowerCase().includes(searchText);
            const matchesuserName = order.userName.toLowerCase().includes(searchText);
            const matchesplantName = order.plantName.toLowerCase().includes(searchText);
            const matchealias = order.alias.toLowerCase().includes(searchText);
            // const formattedDate = new Date(order.poDateTimeFormatted).toLocaleDateString(); // You can customize the format as needed
            // const matchesDate = formattedDate.includes(searchText);
            // Status filter (if isActive is checked, we apply that as well)


            // Combine all search filters
            return (matchesdepartmentName || matchesuserName || matchesplantName || matchealias);
        });
    }
}
