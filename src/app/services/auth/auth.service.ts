import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly baseUrl = 'http://localhost:8080/auth';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser: User | null = null;
    loginUserId: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient, public router: Router) {
        let userString = localStorage.getItem('user');
        if (userString != null) {
            this.currentUser = JSON.parse(userString);
        }
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
        this.http.put<User>(this.baseUrl + '/login', user).subscribe(value => {
            if (value != null) {
                localStorage.setItem('user', JSON.stringify(value));
                this.currentUser = value;
                this.loginUserId.next(this.currentUser.id);
                this.router.navigate(['dashboard']);
            } else {
                this.router.navigate(['login']);
            }
        });
    }

    uploadProfilePicture(data: string) {
        let array = [];
        array[0] = data;
        array[1] = this.currentUser?.id;
        this.http.put<boolean>(this.baseUrl + '/uploadProfilePicture', array).subscribe(value => {
            console.log(value);
        });
    }

    getUserById(userId: string) {
        return this.http.put<User>(this.baseUrl + '/get', userId);
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

    getCurrentUser(): User {
        // @ts-ignore
        return this.currentUser;
    }
}
