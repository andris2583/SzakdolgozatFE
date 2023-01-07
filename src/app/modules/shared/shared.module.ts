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


@NgModule({
    declarations: [
        TagComponent,
        CollectionManagerDialogComponent
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
        MatButtonModule
    ],
    exports: [
        TagComponent
    ]
})
export class SharedModule {
}
