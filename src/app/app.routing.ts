import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'images',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/images/image-list.module').then(m => m.ImageListModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'categories',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/tags/tag-list.module').then(m => m.TagListModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'collection/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule),
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'profile/:userId/:subPage',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
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
