import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag/tag.component';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        TagComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        RouterModule
    ],
    exports: [
        TagComponent
    ]
})
export class SharedModule {
}
