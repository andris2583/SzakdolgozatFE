import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register.component';


const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const RegisterRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
