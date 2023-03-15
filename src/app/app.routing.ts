import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthUserGuard} from './services/auth/auth-user.guard';
import {AuthAdminGuard} from './services/auth/auth-admin.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'dashboard',
        canActivate: [AuthUserGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'images',
        canActivate: [AuthUserGuard],
        loadChildren: () => import('./modules/images/image-list.module').then(m => m.ImageListModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'categories',
        canActivate: [AuthUserGuard],
        loadChildren: () => import('./modules/tags/tag-list.module').then(m => m.TagListModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'collection/:id',
        canActivate: [AuthUserGuard],
        loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'profile/:userId/:subPage',
        canActivate: [AuthUserGuard],
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'admin',
        canActivate: [AuthUserGuard, AuthAdminGuard],
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'register',
        loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
        runGuardsAndResolvers: 'always',
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class ModuleRouting {
}
