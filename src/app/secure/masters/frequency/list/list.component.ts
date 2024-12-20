import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';
import { FrequencyService } from '../frequency.service';
import { Frequency } from 'src/app/model/frequency';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FrequencyListComponent implements OnInit {
  frequencyData: Frequency[] = [];
  page: string = 'Frequency'; // Page name
  isActive: boolean;
  error: string;
  loading: boolean;

  IsAddPermission: boolean = false;
  IsEditPermission: boolean = false;
  IsDeletePermission: boolean = false;

  searchData: { [key: string]: any } = {};
  filtereFrequncyData: any[] = [];

  constructor(
    private frequencyService: FrequencyService,
    private notificationService: ToastrService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    // Permissions for Add, Edit, and Delete
    this.IsAddPermission = this.permissionService.hasPermission('Frequency (PER_FREQUENCY) - Add');
    this.IsEditPermission = this.permissionService.hasPermission('Frequency (PER_FREQUENCY) - Edit');
    this.IsDeletePermission = this.permissionService.hasPermission('Frequency (PER_FREQUENCY) - Delete');

    // Fetch frequency data
    this.getFrequencyData();
  }

  private getFrequencyData() {
    this.loading = true;

    this.frequencyService.getFrequencyList().subscribe(
      (result: any) => {
        this.frequencyData = result;
        this.filtereFrequncyData = result;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  removeFrequency(id: number) {
    const result = confirm(`Are you sure you want to delete this Frequency?`);
    if (result) {
      this.frequencyService.frequencyDelete(id).subscribe(
        () => {
          this.notificationService.error('Frequency deleted successfully.');
          this.getFrequencyData(); // Refresh list
        },
        () => {
          this.notificationService.error('Something went wrong.');
        }
      );
    }
  }

  isActiveRow(row) {
    return {
      'text-dark': !row.isActive // Apply styling for inactive rows
    };
  }

  // Method to update search results based on emitted data from the search panel
  updateSearch(search: { [key: string]: any }) {
    this.searchData = { ...search };  // Store the search data
    //console.log("searchdata", this.searchData);
    // Filtering logic based on code, poNumber, and status
    this.filtereFrequncyData = this.frequencyData.filter(order => {
        const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
        const matchesname = order.name.toLowerCase().includes(searchText);

        // Combine all search filters
        return (matchesname );
    });
}
}
