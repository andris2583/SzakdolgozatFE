import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const ProfileRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
