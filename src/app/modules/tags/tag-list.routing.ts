import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {TagListComponent} from './tag-list.component';

const routes: Routes = [
    {
        path: '',
        component: TagListComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const TagListRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
