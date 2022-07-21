import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRouting} from "./dashboard.routing";
import {DashboardComponent} from "./dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRouting,
    MatGridListModule,
  ],
})
export class DashboardModule { }
