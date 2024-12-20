import { RouterModule, Routes } from '@angular/router';
import { UnitOfMeasureListComponent } from './list/list.component';
import { ApplicationPage, PageAuthGuard } from '@app-core';
import { UnitOfMeasureAddEditComponent } from './add-edit/add-edit.component';
// import { WeightCheckSearchPanelComponent } from './search-panel/search-panel.component';
import { PermissionGuard } from 'src/app/core/guards/permission-guard.service';
import { NgModule } from '@angular/core';
import { UnitOfMeasureComponent } from './unit-of-measure/unit-of-measure.component';
import { UnitOfMeasureSearchPanelComponent } from './search-panel/search-panel.component';


const routes: Routes = [
  {
    path: '',
    component: UnitOfMeasureComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: UnitOfMeasureListComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'UnitOfMeasure (PER_UNIT_OF_MEASURE) - View' }
      },
      {
        path: 'add',
        canActivate: [PermissionGuard],
        data: { permission: 'UnitOfMeasure (PER_UNIT_OF_MEASURE) - Add' },
        component: UnitOfMeasureAddEditComponent
      },
      {
        path: 'edit/:id',
        canActivate: [PermissionGuard],
        data: { permission: 'UnitOfMeasure (PER_UNIT_OF_MEASURE) - Edit' },
        component: UnitOfMeasureAddEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitOfMeasureRoutingModule { }

export const UnitOfMeasureComponents = [
  UnitOfMeasureComponent, UnitOfMeasureListComponent,
  UnitOfMeasureAddEditComponent, UnitOfMeasureSearchPanelComponent

];
// WeightCheckSearchPanelComponent
