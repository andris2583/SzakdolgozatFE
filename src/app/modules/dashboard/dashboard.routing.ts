import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  // {
  //   path: 'other',
  //   component: SomeOtherComponent,
  // }
];

export const DashboardRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
