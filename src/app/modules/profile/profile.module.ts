import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRouting} from './profile.routing';
import {ImageTimelineComponent} from './image-timeline/image-timeline.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {SharedModule} from '../shared/shared.module';
import {NgxMasonryModule} from 'ngx-masonry';
import {PipeModule} from '../pipe/pipe/pipe.module';


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
        PipeModule
    ]
})
export class ProfileModule {
}
