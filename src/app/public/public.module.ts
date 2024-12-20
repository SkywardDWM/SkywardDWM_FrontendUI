import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicService } from './public.service';
import { PublicComponents, PublicRoutingModule } from './public-routing.module';
import { LayoutModule } from '../layout';
import { NgxMaskDirective,NgxMaskPipe } from 'ngx-mask'
import { CookieService } from 'ngx-cookie-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../secure/masters/user/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
    declarations: [
        [...PublicComponents]
    ],
    imports: [
        LayoutModule,
        PublicRoutingModule,
        SharedModule,
        NgxMaskDirective,NgxMaskPipe,
        MatProgressSpinnerModule,MatTableModule,
        MatProgressBarModule
    ],
    providers: [
        PublicService,
        CookieService,UserService
    ]
})
export class PublicModule { }