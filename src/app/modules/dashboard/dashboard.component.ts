import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public pages: Page[] = [
        {route: '/dashboard', name: 'Dashboard', protected: true},
        {route: '/images/all', name: 'Images', protected: true},
        {route: '/categories', name: 'Categories', protected: true},
        {route: '/login', name: 'Login', protected: false},
        {route: '/register', name: 'Register', protected: false},
    ];

    public loginPage: Page = {route: '/login', name: 'Login', protected: false};

    public registerPage: Page = {route: '/register', name: 'Register', protected: false};
    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};


    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    shouldPageBeShown(page: Page): boolean {
        let loggedIn = this.authService.isLoggedIn;
        if (loggedIn) {
            return page.protected;
        } else {
            return !page.protected;
        }
    }


}

