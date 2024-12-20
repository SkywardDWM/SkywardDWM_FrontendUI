import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared';
import { CommonModule } from '@angular/common';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { HolidayComponents, HolidayRoutingModule } from './holiday-routing.module';
// import { HolidayService } from './holiday.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TaskService } from './task.service';
import { TaskComponents, TaskRoutingModule } from './task-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        [...TaskComponents]
    ],
    imports: [
        SharedModule,
        TaskRoutingModule, CommonModule, NgxDatatableModule, NgxMaterialTimepickerModule, MatPaginatorModule
    ],
    providers: [
        TaskService, provideEnvironmentNgxMask()
    ]
})
export class TaskModule { }