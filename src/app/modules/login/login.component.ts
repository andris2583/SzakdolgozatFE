import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {StorageService} from '../../services/auth/storage-service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
        }
    }

    onSubmit(): void {
        const {username, password} = this.form;

        this.authService.login(username, password).subscribe({
            next: data => {
                this.storageService.saveUser(data);
                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.storageService.getUser().roles;
                this.router.navigate(['dashboard']);
            },
            error: err => {
                this.snackBar.open('Failed to login!', '', {duration: 5000});
                this.isLoginFailed = true;
            }
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}