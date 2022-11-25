import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ImageListComponent} from './image-list.component';

const routes: Routes = [
    {
        path: '',
        component: ImageListComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const ImageListRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
