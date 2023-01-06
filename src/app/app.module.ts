import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ModuleRouting} from './app.routing';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {ImageListModule} from './modules/images/image-list.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './modules/header/header.module';
import {FooterModule} from './modules/footer/footer.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './modules/login/login.module';
import {ProfileComponent} from './modules/profile/profile.component';
import {MatButtonModule} from '@angular/material/button';
import {RegisterComponent} from './modules/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TagListModule} from './modules/tags/tag-list.module';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        RegisterComponent,
    ],
    imports: [
        BrowserModule,
        ModuleRouting,
        DashboardModule,
        ImageListModule,
        TagListModule,
        BrowserAnimationsModule,
        HeaderModule,
        FooterModule,
        HttpClientModule,
        LoginModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTabsModule,
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
