import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesRouting} from "./categories.routing";
import {MatGridListModule} from "@angular/material/grid-list";
import {CategoriesComponent} from "./categories.component";



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRouting,
    MatGridListModule
  ]
})
export class CategoriesModule { }
