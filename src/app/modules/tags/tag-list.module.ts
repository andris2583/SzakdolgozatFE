import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagListComponent} from './tag-list.component';
import {TagListRouting} from './tag-list.routing';
import {MatButtonModule} from '@angular/material/button';
import {TagComponent} from './tag/tag.component';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
    declarations: [
        TagListComponent,
        TagComponent
    ],
    imports: [
        CommonModule,
        TagListRouting,
        MatButtonModule,
        PipeModule,
        InfiniteScrollModule
    ],
    exports: [
        TagListComponent,
        TagComponent
    ]
})
export class TagListModule {
}
