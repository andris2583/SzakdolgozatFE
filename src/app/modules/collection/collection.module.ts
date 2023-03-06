import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionComponent} from './collection.component';
import {CollectionRouting} from './collection-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        CollectionComponent
    ],
    imports: [
        CommonModule,
        CollectionRouting,
        SharedModule,
        MatIconModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule
    ]
})
export class CollectionModule {
}
