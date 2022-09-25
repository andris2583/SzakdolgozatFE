import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../../models/tag.model';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    private baseUrl = 'http://localhost:8080/tag';

    constructor(private httpClient: HttpClient) {
    }

    getAllTags(): Observable<Tag[]> {
        return this.httpClient.get<Tag[]>(this.baseUrl + '/getAll');
    }

    getById(tagID: string): Observable<Tag> {
        return this.httpClient.get<Tag>(this.baseUrl + '/get/' + tagID);
    }

    insertTag(tag: Tag): Observable<Tag> {
        return this.httpClient.put<Tag>(this.baseUrl + '/insert', tag);
    }

    deleteTag(tag: Tag): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/delete/' + tag.id);
    }

}
