import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared';
import { CommonModule } from '@angular/common';
// import { RoleComponents, RoleRoutingModule } from './role-routing.module';
// import { RoleService } from './role.service';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DepartmentComponents, DepartmentRoutingModule } from './department-routing.module';
import { DepartmentService } from './department.service';
@NgModule({
    declarations: [
        [...DepartmentComponents]
    ],
    imports: [
        SharedModule,
        DepartmentRoutingModule,CommonModule,NgxDatatableModule 
    ],
    providers: [
        DepartmentService,provideEnvironmentNgxMask()
    ]
})
export class DepartmentModule { }