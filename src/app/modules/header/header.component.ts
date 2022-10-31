import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public pages: { route: string, name: string }[] = [
        {route: '/dashboard', name: 'Dashboard'},
        {route: '/images/all', name: 'Images'},
        {route: '/tags', name: 'Tags'},
    ];

    public loginPage: { route: string, name: string } = {route: '/login', name: 'Login'};
    public profilePage: { route: string, name: string } = {route: '/profile', name: 'Profile'};

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    logOut() {
        this.authService.logOut();
    }
}
