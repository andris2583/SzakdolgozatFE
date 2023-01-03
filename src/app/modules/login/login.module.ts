import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRouting} from './login.routing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRouting,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LoginModule {
}