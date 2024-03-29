import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from './storage-service';

@Injectable({
    providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {
    constructor(
        public storageService: StorageService,
        public router: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.storageService.isLoggedIn()) {
            window.alert('Access not allowed!');
            this.router.navigate(['login']);
        }
        return true;
    }
}
