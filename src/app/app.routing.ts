import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'images/:tag',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/images/image.module').then(m => m.ImageModule)
    },
    {
        path: 'tags',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/tags/tag.module').then(m => m.TagModule)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
    })],
    exports: [RouterModule]
})
export class ModuleRouting {
}
