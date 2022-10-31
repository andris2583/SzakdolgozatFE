import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient, public router: Router) {
    }

    register(user: User) {
        this.http.put<User>(this.baseUrl + '/register', user).subscribe(value => {
            if (value != null) {
                // localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['login']);
            } else {
                console.log('Error username or password already taken ');
            }
        });
    }

    signIn(user: User) {
        this.http.put<boolean>(this.baseUrl + '/login', user).subscribe(value => {
            console.log(value);
            if (value) {
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['dashboard']);
            } else {
                this.router.navigate(['login']);
            }
        });
    }

    getToken() {
        return localStorage.getItem('user');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('user');
        return authToken !== null;
    }

    logOut() {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
    }
}
