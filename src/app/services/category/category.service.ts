import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/category";

  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl+"/getAll");
  }

  getById(categoryID: string): Observable<Category> {
    return this.httpClient.get<Category>(this.baseUrl+"/get/" + categoryID);
  }

  insertCategory(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl+"/insert", category)
  }

  deleteCategory(category: Category) : Observable<void>{
    return  this.httpClient.delete<void>(this.baseUrl+"/delete/"+category.id );
  }

}
