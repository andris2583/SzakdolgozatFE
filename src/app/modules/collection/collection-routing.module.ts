import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionComponent} from './collection.component';


const routes: Routes = [
    {
        path: '',
        component: CollectionComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const CollectionRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
