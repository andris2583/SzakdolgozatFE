import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const LoginRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
