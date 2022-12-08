import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageListRouting} from './image-list.routing';
import {MatGridListModule} from '@angular/material/grid-list';
import {ImageListComponent} from './image-list.component';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {ImageTagListComponent} from './image-view-dialog/image-tag-list/image-tag-list.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
    declarations: [
        ImageListComponent,
        ImageViewDialogComponent,
        ImageUploadDialogComponent,
        DragDropDirective,
        ImageTagListComponent,
    ],
    imports: [
        CommonModule,
        ImageListRouting,
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
        MatTooltipModule,
        PipeModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        FormsModule,
    ],
})
export class ImageListModule {
}
