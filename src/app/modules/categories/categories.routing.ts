import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {CategoriesComponent} from "./categories.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  // {
  //   path: 'other',
  //   component: SomeOtherComponent,
  // }
];

export const CategoriesRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
