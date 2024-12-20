import { Component } from '@angular/core';
import { NatureOfWork } from 'src/app/model/nature-of-work';
import { NatureOfWorkService } from '../nature-of-work.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NatureOfWorkListComponent {

  natureOfWorkData: NatureOfWork[] = [];
  loading: boolean;
  IsAddPermission: boolean = false;
  IsEditPermission: boolean = false;
  IsDeletePermission: boolean = false;

  searchData: { [key: string]: any } = {};
    filteredNatureOfWorkData: any[] = [];

  constructor(
    private natureOfWorkService: NatureOfWorkService,
    private notificationService: ToastrService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.IsAddPermission = this.permissionService.hasPermission('NatureOfWork (PER_NATURE_OF_WORK) - Add');
    this.IsEditPermission = this.permissionService.hasPermission('NatureOfWork (PER_NATURE_OF_WORK) - Edit');
    this.IsDeletePermission = this.permissionService.hasPermission('NatureOfWork (PER_NATURE_OF_WORK) - Delete');
    this.getNatureOfWorkData();
  }

  private getNatureOfWorkData() {
    this.loading = true;
    this.natureOfWorkService.getNatureOfWorkList()
      .subscribe((result: any) => {
        this.natureOfWorkData = result;
        this.filteredNatureOfWorkData = result;
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.loading = false;
      });
  }

  removeNatureOfWork(id: number) {
    const confirmDelete = confirm(`Are you sure you want to delete this Nature Of Work?`);
    if (confirmDelete) {
      this.natureOfWorkService.deleteNatureOfWork(id)
        .subscribe(() => {
          this.notificationService.error('Nature Of Work deleted successfully.');
          this.getNatureOfWorkData();
        }, () => {
          this.notificationService.error('Something went wrong.');
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
    this.filteredNatureOfWorkData = this.natureOfWorkData.filter(order => {
        const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
        const matchesname = order.name.toLowerCase().includes(searchText);
        // Combine all search filters
        return (matchesname);
    });
}
}
