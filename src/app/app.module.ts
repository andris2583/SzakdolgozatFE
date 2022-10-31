import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ModuleRouting} from './app.routing';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {ImageModule} from './modules/images/image.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderModule} from './modules/header/header.module';
import {FooterModule} from './modules/footer/footer.module';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './modules/login/login.module';
import {ProfileComponent} from './modules/profile/profile.component';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './modules/register/register.component';


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
        ImageModule,
        BrowserAnimationsModule,
        HeaderModule,
        FooterModule,
        HttpClientModule,
        LoginModule,
        MatButtonModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
