import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import {CategoriesRouting} from "./categories.routing";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRouting,
    MatButtonModule
  ]
})
export class CategoriesModule { }
