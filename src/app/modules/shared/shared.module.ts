import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag/tag.component';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {RouterModule} from '@angular/router';
import {CollectionManagerDialogComponent} from './collection-manager-dialog/collection-manager-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {ImageMasonryListComponent} from './image-masonry-list/image-masonry-list.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    declarations: [
        TagComponent,
        CollectionManagerDialogComponent,
        ImageMasonryListComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        RouterModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        NgxMasonryModule,
        InfiniteScrollModule,
        MatTooltipModule
    ],
    exports: [
        TagComponent,
        ImageMasonryListComponent
    ]
})
export class SharedModule {
}
