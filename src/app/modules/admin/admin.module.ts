import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRouting} from './admin.routing';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRouting,
        MatTabsModule,
        MatTableModule,
        MatTooltipModule,
        FormsModule
    ]
})
export class AdminModule {
}
