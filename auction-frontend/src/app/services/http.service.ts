import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  get(url:any): any {
    return this.http.get(environment.apiUrl + url).toPromise()
  }
  post(url:any, body:any): any {
    return this.http.post(environment.apiUrl + url, body).toPromise()
  }

  put(url:any, body:any): any {
    return this.http.put(environment.apiUrl + url, body).toPromise()
  }

  patch(url:any, body:any): any {
    return this.http.patch(environment.apiUrl + url, body).toPromise()
  }

  delete(url:any): any {
    return this.http.delete(environment.apiUrl + url).toPromise()
  }
}
