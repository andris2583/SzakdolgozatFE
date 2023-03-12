import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {Image} from '../../models/image.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly baseUrl = 'http://localhost:8080/dashboard';

    constructor(private httpClient: HttpClient) {
    }

    getSeasonalTags(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.baseUrl + '/getSeasonalTags/');
    }

    getFavouriteTags(user: User): Observable<string[]> {
        return this.httpClient.put<string[]>(this.baseUrl + '/getFavouriteTags/', user.id);
    }

    getSimilarToUserImages(user: User): Observable<Image[]> {
        return this.httpClient.put<Image[]>(this.baseUrl + '/getSimilarToUserImages', user.id);
    }
}
