import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as Sentry from '@sentry/browser';

interface User{
  email: String,
  phone: String
  gender: String
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`).pipe(catchError(this.errorHandler));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`).pipe(catchError(this.errorHandler));
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product).pipe(catchError(this.errorHandler));
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes).pipe(catchError(this.errorHandler));
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`).pipe(catchError(this.errorHandler));
  }

  getRandomUsers(): Observable<User[]>{
    return this.http.get('https://randomuser.me/api/?results=1')
    .pipe(
      retry(3),
      catchError(this.errorHandler),
      map((response:any)=>{
        return response.results as User[];
      })
    )
  }

  getFile(){
    
  }

  private errorHandler(error: HttpErrorResponse){
    console.log(error);
    Sentry.captureException(error);
    return throwError('Ups, algo salio mal');
  }

}
