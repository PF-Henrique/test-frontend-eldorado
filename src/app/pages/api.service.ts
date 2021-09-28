import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseURL = " http://localhost:3333";
  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/product-categories`);
  }

  read(id): Observable<any> {
    return this.httpClient.get(`${this.baseURL}//product-categories/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(this.baseURL, data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(
      `${this.baseURL}/product-categories/${id}`,
      data
    );
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/product-categories/${id}`);
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(
      `${this.baseURL}/product-categories?name=${name}`
    );
  }
}
