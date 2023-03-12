import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: any = {
        username: null,
        email: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;

    constructor(
        public fb: FormBuilder,
        public authService: AuthService,
        public router: Router,
        private snackBar: MatSnackBar
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const {username, email, password} = this.form;

        this.authService.register(username, email, password).subscribe({
            next: data => {
                this.router.navigate(['login']);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            error: err => {
                this.snackBar.open('Failed to signin!', '', {duration: 5000});
                this.isSignUpFailed = true;
            }
        });
    }
}
