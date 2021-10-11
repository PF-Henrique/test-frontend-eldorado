import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  baseURL = " http://localhost:3333";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<any> {
    return this.httpClient
      .get(`${this.baseURL}/product-categories`)
      .pipe(catchError(this.errorHandler));
  }

  read(id): Observable<any> {
    return this.httpClient
      .get(`${this.baseURL}/product-categories/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  create(data): Observable<any> {
    return this.httpClient
      .post(this.baseURL, data)
      .pipe(catchError(this.errorHandler));
  }

  update(id, data): Observable<any> {
    return this.httpClient
      .put(`${this.baseURL}/product-categories/${id}`, data)
      .pipe(catchError(this.errorHandler));
  }

  delete(id): Observable<any> {
    return this.httpClient
      .delete(`${this.baseURL}/product-categories/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
