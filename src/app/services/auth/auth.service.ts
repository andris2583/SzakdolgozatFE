import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {HttpClient, HttpHeaders,} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {SubscriptionType, SubscriptionTypeMBSize} from '../../models/request/subscription-type';
import {StorageService} from './storage-service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly userUrl = 'http://localhost:8080/user';
    private readonly authUrl = 'http://localhost:8080/auth';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentUser: User | null = null;
    loginUserId: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient, public router: Router, private storageService: StorageService) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.currentUser = storageService.getUser();
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(
            this.authUrl + '/signin',
            {
                username,
                password,
            },
            httpOptions
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(
            this.authUrl + '/signup',
            {
                username,
                email,
                password,
            },
            httpOptions
        );
    }

    logout() {
        // return this.http.post(this.authUrl + '/signout', {}, httpOptions);
        this.storageService.clean();
        this.router.navigate(['login']);

    }

    uploadProfilePicture(data: string) {
        let array = [];
        array[0] = data;
        array[1] = this.currentUser?.id;
        return this.http.put<boolean>(this.userUrl + '/uploadProfilePicture', array);
    }

    updateUser(user: User) {
        return this.http.put<boolean>(this.userUrl + '/update', user);
    }

    getAllUsers() {
        return this.http.get<User[]>(this.userUrl + '/getAll');
    }

    getUserById(userId: string) {
        return this.http.put<User>(this.userUrl + '/get', userId);
    }

    getCurrentUser(): User {
        return this.storageService.getUser();
    }

    getMaxStorage(): number {
        switch (this.currentUser!.subscriptionType) {
            case SubscriptionType.PRO:
                return SubscriptionTypeMBSize.PRO * 1000000;
            case SubscriptionType.FREE:
                return SubscriptionTypeMBSize.FREE * 1000000;
            default:
                return SubscriptionTypeMBSize.FREE * 1000000;
        }
    }
}
