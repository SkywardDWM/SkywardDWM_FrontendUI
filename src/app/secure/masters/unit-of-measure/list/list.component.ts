import { Component } from '@angular/core';
import { ApplicationPage, PermissionType } from '@app-core';
//import { UnitOfMeasure } from 'src/app/model/unit-of-measure'; // Assuming you have this model
import { UnitOfMeasureService } from '../unit-of-measure.service'; // Assuming service is created for unit of measure
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';
import { UnitOfMeasure } from 'src/app/model/unitOfMeasure';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UnitOfMeasureListComponent {

  unitOfMeasureData: UnitOfMeasure[] = [];
  page: string = ApplicationPage.unit_of_measure; // Change this according to your application page type
  permissions = PermissionType;
  isActive: boolean;
  error: string;
  loading: boolean;
  IsAddPermission: boolean = false;
  IsEditPermission: boolean = false;
  IsDeletePermission: boolean = false;

  searchData: { [key: string]: any } = {};
  filteredUnitOfMeasureData: any[] = [];

  constructor(
    private unitOfMeasureService: UnitOfMeasureService,
    private notificationService: ToastrService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    // Check user permissions
    this.IsAddPermission = this.permissionService.hasPermission('UnitOfMeasure (PER_UNIT_OF_MEASURE) - Add');
    this.IsEditPermission = this.permissionService.hasPermission('UnitOfMeasure (PER_UNIT_OF_MEASURE) - Edit');
    this.IsDeletePermission = this.permissionService.hasPermission('UnitOfMeasure (PER_UNIT_OF_MEASURE) - Delete');
    this.getUnitOfMeasureData(); // Fetch data on initialization
  }

  private getUnitOfMeasureData() {
    this.loading = true;

    this.unitOfMeasureService.getUnitOfMeasureList()
      .subscribe((result: any) => {
        this.unitOfMeasureData = result;
        this.filteredUnitOfMeasureData = result;
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
  }

  // Method to handle the deletion of a Unit of Measure
  removeUnit(id: number) {
    const result = confirm(`Are you sure, you want to delete this Unit of Measure?`);
    if (result) {
      this.unitOfMeasureService.unitOfMeasureDelete(id)
        .subscribe(() => {
          this.notificationService.error('Unit of Measure deleted successfully.');
          this.getUnitOfMeasureData(); // Refresh data after deletion
        }, () => {
          this.notificationService.error("Something went wrong.");
        });
    }
  }

  // Determine row class based on the active status of the unit
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
    this.filteredUnitOfMeasureData = this.unitOfMeasureData.filter(order => {
        const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
        const matchesunitName = order.unitName.toLowerCase().includes(searchText);

        // Combine all search filters
        return (matchesunitName );
    });
}

}
