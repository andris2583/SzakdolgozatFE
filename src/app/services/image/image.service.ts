import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Thumbnail} from "../../models/thumbnail.model";
import {Image} from "../../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = "http://localhost:8080/image";

  constructor(private httpClient: HttpClient) {
  }

  getAllImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.baseUrl+"/getAll");
  }

  getById(imageID: string): Observable<Image> {
    return this.httpClient.get<Image>(this.baseUrl+"/get?id=" + imageID);
  }

  insertImage(image: Image): Observable<Image> {
    return this.httpClient.put<Image>(this.baseUrl+"/insert", image)
  }

  deleteImage(image: Image) : Observable<void>{
    return  this.httpClient.delete<void>(this.baseUrl+"/delete/"+image.id );
  }
}
