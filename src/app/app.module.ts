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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagListModule} from './modules/tags/tag-list.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {PipeModule} from './modules/pipe/pipe/pipe.module';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from './modules/shared/shared.module';
import {MAT_TOOLTIP_DEFAULT_OPTIONS} from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ProfileModule} from './modules/profile/profile.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {httpInterceptorProviders} from './interceptors/http-request-interceptor';
import {AdminModule} from './modules/admin/admin.module';


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
        MatGridListModule,
        PipeModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
        LeafletModule,
        ProfileModule,
        MatProgressBarModule,
        FormsModule,
        AdminModule
    ],
    providers: [
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TagOrderShufflerInterceptor,
        //     multi: true
        // },
        {
            provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
            useValue: {
                showDelay: 0,
                hideDelay: 0,
                touchendHideDelay: 1500,
                disableTooltipInteractivity: true
            },
        }, {
            provide: MatDialogRef,
            useValue: {}
        }, {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        },
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
