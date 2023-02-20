import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'szakdolgozat';
    dashboardHeader: boolean = true;


    constructor(private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.events.subscribe(value => {
            if (value instanceof NavigationEnd) {
                if (value.url == '/dashboard' || value.url == '/' || value.url == '') {
                    this.dashboardHeader = true;
                } else {
                    this.dashboardHeader = false;
                }
            }
        });

    }
}
