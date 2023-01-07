import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Collection} from '../../models/collection';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {

    private readonly baseUrl = 'http://localhost:8080/collection';

    constructor(private httpClient: HttpClient) {
    }

    getAllCollections(): Observable<Collection[]> {
        return this.httpClient.get<Collection[]>(this.baseUrl + '/getAll/');
    }

    getCollectionsByUserId(userId: string): Observable<Collection[]> {
        return this.httpClient.get<Collection[]>(this.baseUrl + '/getCollectionsByUserId/' + userId);
    }

    saveToFavourites(userId: string, imageId: string): Observable<Collection> {
        return this.httpClient.get<Collection>(this.baseUrl + '/saveToFavourites/' + userId + '/' + imageId);
    }

    saveToCollection(userId: string, collectionId: string, imageId: string): Observable<Collection> {
        return this.httpClient.get<Collection>(this.baseUrl + '/saveToCollection/' + userId + '/' + collectionId + '/' + imageId);
    }

    insertCollection(collection: Collection): Observable<Collection> {
        return this.httpClient.put<Collection>(this.baseUrl + '/insert/', collection);
    }
}
