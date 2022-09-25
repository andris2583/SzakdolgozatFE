import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TagComponent} from './tag.component';

const routes: Routes = [
    {
        path: '',
        component: TagComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const TagRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
