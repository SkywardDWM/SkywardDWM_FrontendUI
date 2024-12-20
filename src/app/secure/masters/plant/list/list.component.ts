import { Component } from '@angular/core';
import { ApplicationPage, PermissionType } from '@app-core';
import { Plant } from 'src/app/model/plant';
import { PlantService } from '../plant.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from 'src/app/core/service/permission.service';

@Component({
    selector: 'app-list',
    // standalone: true,
    // imports: [],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class PlantListComponent {

    plantData: any[] = [];
    page: string = ApplicationPage.plant;
    permissions = PermissionType;
    isActive: boolean;
    error: string;
    loading: boolean;
    IsAddPemission: boolean = false;
    IsEditPermission: boolean = false;
    IsDeletePermission: boolean = false;

    searchData: { [key: string]: any } = {};
    filterePlantData :any[] = [];

    constructor(private plantService: PlantService, private notificationService: ToastrService,
        private permissionService: PermissionService
    ) {

    }

    ngOnInit(): void {
        this.IsAddPemission = this.permissionService.hasPermission('Plant (PER_PLANT) - Add');
        this.IsEditPermission = this.permissionService.hasPermission('Plant (PER_PLANT) - Edit');
        this.IsDeletePermission = this.permissionService.hasPermission('Plant (PER_PLANT) - Delete');
        this.getPlantData();
    }

    private getPlantData() {
        this.loading = true;

        this.plantService.getPlantList()
            .subscribe((result: any) => {
                this.plantData = result;
                this.filterePlantData = result;
                //console.log("result-----"+this.plantData)
                this.loading = false;

            }, (error) => {
                console.log(error);
                this.loading = false;

            });
    }

    removePlant(id: number) {
        const result = confirm(`Are you sure, you want to delete this Plant?`);
        if (result) {
            this.plantService.plantDelete(id)
                .subscribe(() => {
                    this.notificationService.error('Plant deleted successfully.');
                    this.getPlantData();
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
    // updateSearch(search: { [key: string]: any }) {
    //     this.searchData = { ...search };  // Store the search data
    //     //console.log("searchdata", this.searchData);
    //     // Filtering logic based on code, poNumber, and status
    //     this.filterePlantData = this.plantData.filter(order => {
    //         const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
    //         const matchesplantName = order.plantName.toLowerCase().includes(searchText);
    //         const matchesalias = order.alias.toLowerCase().includes(searchText);
    //         const matchesdescription = order.description.toLowerCase().includes(searchText);
    //         // const formattedDate = new Date(order.poDateTimeFormatted).toLocaleDateString(); // You can customize the format as needed
    //         // const matchesDate = formattedDate.includes(searchText);
    //         // Status filter (if isActive is checked, we apply that as well)


    //         // Combine all search filters
    //         return (matchesplantName || matchesalias || matchesdescription );
    //     });
    // }

    updateSearch(search: { [key: string]: any }) {
        this.searchData = { ...search };  // Store the search data
        this.filterePlantData = this.plantData.filter(order => {
            const searchText = this.searchData.name ? this.searchData.name.toLowerCase() : '';
            const matchesPlantName = order.plantName.toLowerCase().includes(searchText);
            const matchesAlias = order.alias.toLowerCase().includes(searchText);
            const matchesDescription = (order.description || '-').toLowerCase().includes(searchText); // Ensure hyphen for empty description
    
            return (matchesPlantName || matchesAlias || matchesDescription);
        });
    }
    

}
