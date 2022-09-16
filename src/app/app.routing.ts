import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [

  {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'images/:category', loadChildren: () => import('./modules/images/image.module').then(m => m.ImageModule)},
  {path: 'categories', loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class ModuleRouting { }
