import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRouting} from './profile.routing';
import {ImageTimelineComponent} from './image-timeline/image-timeline.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {SharedModule} from '../shared/shared.module';
import {NgxMasonryModule} from 'ngx-masonry';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
    declarations: [
        ImageTimelineComponent
    ],
    exports: [
        ImageTimelineComponent
    ],
    imports: [
        CommonModule,
        ProfileRouting,
        MatIconModule,
        MatDividerModule,
        SharedModule,
        NgxMasonryModule,
        PipeModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        InfiniteScrollModule
    ]
})
export class ProfileModule {
}
