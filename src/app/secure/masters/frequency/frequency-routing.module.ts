import { RouterModule, Routes } from '@angular/router';
import { FrequencyListComponent } from './list/list.component';
import { ApplicationPage, PageAuthGuard } from '@app-core';
import { FrequencyAddEditComponent } from './add-edit/add-edit.component';
// import { WeightCheckSearchPanelComponent } from './search-panel/search-panel.component';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { NgModule } from '@angular/core';
import { FrequencyComponent } from './frequency/frequency.component';
import { FrequencySearchPanelComponent } from './search-panel/search-panel.component';


const routes: Routes = [
  {
    path: '',
    component: FrequencyComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: FrequencyListComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'Frequency (PER_FREQUENCY) - View' }
      },
      {
        path: 'add',
        canActivate: [PermissionGuard],
        data: { permission: 'Frequency (PER_FREQUENCY) - Add' },
        component: FrequencyAddEditComponent
      },
      {
        path: 'edit/:id',
        canActivate: [PermissionGuard],
        data: { permission: 'Frequency (PER_FREQUENCY) - Edit' },
        component: FrequencyAddEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequencyRoutingModule { }

export const FrequencyComponents = [
  FrequencyComponent, FrequencyListComponent,
  FrequencyAddEditComponent, FrequencySearchPanelComponent

];
// WeightCheckSearchPanelComponent
