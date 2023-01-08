import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionComponent} from './collection.component';
import {CollectionRouting} from './collection-routing.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        CollectionComponent
    ],
    imports: [
        CommonModule,
        CollectionRouting,
        SharedModule
    ]
})
export class CollectionModule {
}
