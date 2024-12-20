import { Component, OnInit } from '@angular/core';
import { Holiday } from 'src/app/model/Holiday';
import { ApplicationPage, PermissionType } from '@app-core';
import { HolidayService } from '../holiday.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class HolidayListComponent implements OnInit {

    holidayData: any[] = [];
    page: string = ApplicationPage.holiday;
    permissions = PermissionType;
    isActive: boolean;
    error: string;
    loading: boolean;

    IsAddPemission: boolean = false;
    IsEditPermission: boolean = false;
    IsDeletePermission: boolean = false;

    searchData: { [key: string]: any } = {};
    filteredHolidayData :any[] = []

    constructor(private holidayService: HolidayService, private notificationService: ToastrService,
        private permissionService: PermissionService
    ) { }
    ngOnInit(): void {
        this.IsAddPemission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Add');
        this.IsEditPermission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Edit');
        this.IsDeletePermission = this.permissionService.hasPermission('Holiday (PER_HOLIDAY) - Delete');
        this.getHolidayData();
    }
    private getHolidayData() {
        this.loading = true;

        this.holidayService.getHoliday()
            .subscribe((result: any) => {
                // Transform the holiday data to replace null, undefined, or empty type with "-"
                this.holidayData = result.map(holiday => ({
                    ...holiday,
                    type: holiday.type == null || holiday.type === "" ? "-" : (holiday.type === 1 ? 'Custom' : 'Holiday')
                }));
                this.filteredHolidayData = this.holidayData;
                this.loading = false;

            }, (error) => {
                console.log(error);
                this.loading = false;
            });
    }
    removeHoliday(id: number) {
        const result = confirm(`Are you sure, you want to delete this holiday?`);
        if (result) {
            this.holidayService.deleteHoliday(id)
                .subscribe(() => {
                    this.notificationService.error('Holiday deleted successfully!', '', {
                        timeOut: 3000,
                      });
                    this.getHolidayData();
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
    this.filteredHolidayData = this.holidayData.filter(order => {
      const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
      const matchescode = order.code.toLowerCase().includes(searchText);
      const matchescalendarName = order.calendarName?.toLowerCase().includes(searchText);
      const matchesholidayName = order.holidayName?.toLowerCase().includes(searchText);
     // const formattedDate = new Date(order.poDateTimeFormatted).toLocaleDateString(); // You can customize the format as needed
     // const matchesDate = formattedDate.includes(searchText);
      // Status filter (if isActive is checked, we apply that as well)
     

      // Combine all search filters
      return (matchescode || matchescalendarName || matchesholidayName) ;
    });
  }
}

