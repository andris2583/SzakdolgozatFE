import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Thumbnail} from "../../models/thumbnail.model";

@Injectable({
  providedIn: 'root'
})
export class ThumbnailService {

  constructor(private httpClient: HttpClient) { }

  getAllThumbnails(): Observable<Thumbnail[]>{
    return this.httpClient.get<Thumbnail[]>("http://localhost:8080/thumbnail/getAll");
  }

}
