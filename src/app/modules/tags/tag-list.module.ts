import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagListComponent} from './tag-list.component';
import {TagListRouting} from './tag-list.routing';
import {MatButtonModule} from '@angular/material/button';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        TagListComponent,
    ],
    imports: [
        CommonModule,
        TagListRouting,
        MatButtonModule,
        PipeModule,
        InfiniteScrollModule,
        SharedModule
    ],
})
export class TagListModule {
}
