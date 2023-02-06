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
        loadChildren: () => import('./modules/images/image-list.module').then(m => m.ImageListModule)
    },
    {
        path: 'categories',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/tags/tag-list.module').then(m => m.TagListModule)
    },
    {
        path: 'collection/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule)
    },
    {
        path: 'profile/:subPage',
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
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class ModuleRouting {
}
