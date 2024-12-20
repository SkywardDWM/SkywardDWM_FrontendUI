import { NgModule } from '@angular/core';
import { SharedModule } from '@app-shared';
import { CommonModule } from '@angular/common';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HolidayComponents, HolidayRoutingModule } from './holiday-routing.module';
import { HolidayService } from './holiday.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        [...HolidayComponents]
    ],
    imports: [
        SharedModule,
        HolidayRoutingModule, CommonModule, NgxDatatableModule, NgxMaterialTimepickerModule
    ],
    providers: [
        HolidayService, provideEnvironmentNgxMask()
    ]
})
export class HolidayModule { }