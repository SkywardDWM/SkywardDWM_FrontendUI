import { RouterModule, Routes } from '@angular/router';
import { PlantListComponent } from './list/list.component';
import { ApplicationPage, PageAuthGuard } from '@app-core';
import { PlantAddEditComponent } from './add-edit/add-edit.component';
// import { WeightCheckSearchPanelComponent } from './search-panel/search-panel.component';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { NgModule } from '@angular/core';
import { PlantComponent } from './plant/plant.component';
import { PlantSearchPanelComponent } from './search-panel/search-panel.component';


const routes: Routes = [
  {
      path: '',
      component: PlantComponent,
      children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
              path: 'list',
              component: PlantListComponent,
              canActivate: [PermissionGuard],
              data: { permission: 'Plant (PER_PLANT) - View' }
          },
          {
              path: 'add',
              canActivate: [PermissionGuard],
              data: { permission: 'Plant (PER_PLANT) - Add' },
              component: PlantAddEditComponent
          },
          {
              path: 'edit/:id',
              canActivate: [PermissionGuard],
              data: { permission:  'Plant (PER_PLANT) - Edit' },
              component: PlantAddEditComponent
          },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantRoutingModule { }

export const PlantComponents = [
  PlantComponent, PlantListComponent,
  PlantAddEditComponent, PlantSearchPanelComponent
  
];
// WeightCheckSearchPanelComponent
