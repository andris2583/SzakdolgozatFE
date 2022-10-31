import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user: User | null = null;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        let userString = localStorage.getItem('user');
        if (userString != null) {
            this.user = JSON.parse(userString);
        }
    }


    logOut() {
        this.authService.logOut();
    }
}
