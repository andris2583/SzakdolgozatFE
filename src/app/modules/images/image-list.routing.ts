import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ImageListComponent} from './image-list.component';
import {ImageViewDialogComponent} from './image-view-dialog/image-view-dialog.component';

const routes: Routes = [
    {
        path: 'list/:tag',
        component: ImageListComponent,
    },
    {
        path: 'image/:imageId',
        component: ImageViewDialogComponent,
    }
    // {
    //   path: 'other',
    //   component: SomeOtherComponent,
    // }
];

export const ImageListRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);
