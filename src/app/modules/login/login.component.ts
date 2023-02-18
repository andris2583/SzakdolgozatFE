import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        public fb: FormBuilder,
        public authService: AuthService,
        public router: Router
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.loginForm = this.fb.group({
            username: [''],
            password: [''],
        });
    }

    ngOnInit() {
    }

    loginUser() {
        this.authService.signIn(this.loginForm.value);
    }
}
