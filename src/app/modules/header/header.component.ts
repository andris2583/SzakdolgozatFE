import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Page} from '../../models/page.model';
import {Router} from '@angular/router';
import {Pages} from '../../models/constants/pages';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
    @Input()
    public dashboardHeader: boolean = false;

    public pages = new Pages().pages;

    public profilePage: Page = {route: '/profile', name: 'Profile', protected: true};

    constructor(private authService: AuthService, public router: Router) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    shouldPageBeShown(page: Page): boolean {
        let loggedIn = this.authService.isLoggedIn;
        if (loggedIn) {
            return page.protected;
        } else {
            return !page.protected;
        }
    }

    shouldHeaderBeShown() {
        return !this.router.url.startsWith('/dashboard');
    }
}
