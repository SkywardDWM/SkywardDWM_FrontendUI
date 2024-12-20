import { NgModule } from "@angular/core";
import { ActivityComponents, ActivityRoutingModule,  } from "./activity-routing.module";
import { SharedModule } from "@app-shared";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { provideEnvironmentNgxMask } from "ngx-mask";
import { ActivityService } from "./activity.service";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
    declarations: [
        [...ActivityComponents]
    ],
    imports: [
        SharedModule,
        ActivityRoutingModule,CommonModule,NgxDatatableModule,MatPaginatorModule 
    ],
    providers: [
        ActivityService,provideEnvironmentNgxMask()
    ]
})
export class ActivityModule { }