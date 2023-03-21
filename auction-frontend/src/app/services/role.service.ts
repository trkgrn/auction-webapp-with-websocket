import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http:HttpService) { }

  getAll(){
    return this.http.get('/role/all');
  }
}
