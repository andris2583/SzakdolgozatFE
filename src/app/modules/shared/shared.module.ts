import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagComponent} from './tag/tag.component';
import {PipeModule} from '../pipe/pipe/pipe.module';
import {RouterModule} from '@angular/router';
import {CollectionManagerDialogComponent} from './collection-manager-dialog/collection-manager-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    declarations: [
        TagComponent,
        CollectionManagerDialogComponent
    ],
    imports: [
        CommonModule,
        PipeModule,
        RouterModule,
        MatCheckboxModule
    ],
    exports: [
        TagComponent
    ]
})
export class SharedModule {
}
