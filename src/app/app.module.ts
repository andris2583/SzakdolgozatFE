import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ModuleRouting} from "./app.routing";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {CategoriesModule} from "./modules/categories/categories.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderModule} from "./modules/header/header.module";
import {FooterModule} from "./modules/footer/footer.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ModuleRouting,
    DashboardModule,
    CategoriesModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
