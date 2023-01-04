import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {FormsModule} from '@angular/forms';
import {TagListModule} from '../tags/tag-list.module';
import {PipeModule} from '../pipe/pipe/pipe.module';


@NgModule({
    declarations: [
        HeaderComponent,
        SearchbarComponent
    ],
    exports: [
        HeaderComponent,
        SearchbarComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        TagListModule,
        PipeModule,
    ]
})
export class HeaderModule {
}
