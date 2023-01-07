import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../../models/image.model';
import {BatchImageRequest} from '../../models/request/batch-image-request.model';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private readonly baseUrl = 'http://localhost:8080/image';

    constructor(private httpClient: HttpClient) {
    }

    getImages(batchImageRequest: BatchImageRequest): Observable<Image[]> {
        return this.httpClient.put<Image[]>(this.baseUrl + '/getAll/', batchImageRequest);
    }

    getById(imageID: string): Observable<Image> {
        return this.httpClient.get<Image>(this.baseUrl + '/get/' + imageID);
    }

    getImagesByIds(imageIds: string[]): Observable<Image[]> {
        return this.httpClient.put<Image[]>(this.baseUrl + '/getImagesByIds/', imageIds);
    }

    insertImage(image: Image): Observable<Image> {
        return this.httpClient.put<Image>(this.baseUrl + '/insert/', image);
    }

    updateImage(image: Image): Observable<Image> {
        return this.httpClient.put<Image>(this.baseUrl + '/update/', image);
    }

    deleteImage(image: Image): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/delete/' + image.id);
    }

    getImageData(image: Image): Observable<Blob> {
        return this.httpClient.get(this.baseUrl + '/getImageData/' + image.id, {responseType: 'blob'});
    }

    getTags(imageB64: string): Observable<string[]> {
        return this.httpClient.put<string[]>(this.baseUrl + '/getTags/', imageB64);
    }

    getSimilarImages(tags: string[]): Observable<Image[]> {
        return this.httpClient.put<Image[]>(this.baseUrl + '/getSimilarImages/', tags);
    }

    getImageCountWithTag(tag: string): Observable<number> {
        return this.httpClient.put<number>(this.baseUrl + '/getImageCountWithTag/', tag);
    }
}
