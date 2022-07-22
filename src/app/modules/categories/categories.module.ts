import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesRouting} from "./categories.routing";
import {MatGridListModule} from "@angular/material/grid-list";
import {CategoriesComponent} from "./categories.component";
import { ImageViewDialogComponent } from './image-view-dialog/image-view-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {GetNoExtensionNamePipe, SanitizeImagePipe} from "../../services/image/image-util.pipe";
import {NgxImageZoomModule} from "ngx-image-zoom";



@NgModule({
  declarations: [
    CategoriesComponent,
    ImageViewDialogComponent,
    GetNoExtensionNamePipe,
    SanitizeImagePipe
  ],
  imports: [
    CommonModule,
    CategoriesRouting,
    MatGridListModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    NgxImageZoomModule,
    // RedZoomModule,
  ],
  providers: [
    SanitizeImagePipe
  ]
})
export class CategoriesModule { }
