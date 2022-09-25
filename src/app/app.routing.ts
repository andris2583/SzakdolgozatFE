import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [

    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {path: 'images/:tag', loadChildren: () => import('./modules/images/image.module').then(m => m.ImageModule)},
    {path: 'tags', loadChildren: () => import('./modules/tags/tag.module').then(m => m.TagModule)},

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class ModuleRouting {
}
