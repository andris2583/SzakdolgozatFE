import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag.component';
import {TagRouting} from './tagRouting';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        TagComponent
    ],
    imports: [
        CommonModule,
        TagRouting,
        MatButtonModule
    ]
})
export class TagModule {
}
