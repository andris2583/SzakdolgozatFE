import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageRouting} from './image.routing';
import {MatGridListModule} from '@angular/material/grid-list';
import {ImageComponent} from './image.component';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {GetNoExtensionNamePipe, SanitizeImagePipe} from '../../services/image/image-util.pipe';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgxMasonryModule} from 'ngx-masonry';
import {ImageUploadDialogComponent} from './image-upload-dialog/image-upload-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {DragDropDirective} from '../../directives/drag-drop/drag-drop.directive';


@NgModule({
    declarations: [
        ImageComponent,
        ImageViewDialogComponent,
        GetNoExtensionNamePipe,
        SanitizeImagePipe,
        ImageUploadDialogComponent,
        DragDropDirective,
    ],
    imports: [
        CommonModule,
        ImageRouting,
        MatGridListModule,
        MatDialogModule,
        MatToolbarModule,
        MatButtonModule,
        NgxImageZoomModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ScrollingModule,
        NgxMasonryModule,
        MatChipsModule,
        MatListModule,
        InfiniteScrollModule,
    ],
    providers: [
        SanitizeImagePipe
    ]
})
export class ImageModule {
}
