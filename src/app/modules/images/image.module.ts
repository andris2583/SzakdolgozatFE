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


@NgModule({
    declarations: [
        ImageComponent,
        ImageViewDialogComponent,
        GetNoExtensionNamePipe,
        SanitizeImagePipe,
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
    ],
    providers: [
        SanitizeImagePipe
    ]
})
export class ImageModule {
}
