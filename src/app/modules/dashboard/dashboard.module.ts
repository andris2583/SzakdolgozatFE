import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRouting} from './dashboard.routing';
import {DashboardComponent} from './dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {HeaderModule} from '../header/header.module';
import {MatButtonModule} from '@angular/material/button';
import {NgxMasonryModule} from 'ngx-masonry';


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRouting,
        MatGridListModule,
        HeaderModule,
        MatButtonModule,
        NgxMasonryModule,
    ],
})
export class DashboardModule {
}
