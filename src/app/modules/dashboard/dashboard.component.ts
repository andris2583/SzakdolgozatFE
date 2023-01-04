import {Component, OnInit} from '@angular/core';
import {Page} from '../../models/page.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        console.log('Kurva anyád');
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

