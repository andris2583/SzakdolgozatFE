import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ImageComponent} from "./image.component";

const routes: Routes = [
  {
    path: '',
    component: ImageComponent,
  },
  // {
  //   path: 'other',
  //   component: SomeOtherComponent,
  // }
];

export const ImageRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
