import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Thumbnail} from "../../models/thumbnail.model";
import {Image} from "../../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getAllImages(): Observable<Image[]>{
    return this.httpClient.get<Image[]>("http://localhost:8080/image/getAll");
  }

  getById(imageID: string): Observable<Image>{
  return this.httpClient.get<Image>("http://localhost:8080/image/get?id="+imageID);
}
}
