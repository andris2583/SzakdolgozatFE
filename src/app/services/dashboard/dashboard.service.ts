import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

}
