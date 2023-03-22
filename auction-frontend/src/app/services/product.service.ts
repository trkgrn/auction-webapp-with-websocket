import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Product} from "../models/entity/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpService) { }

  get(id:any){
    return this.http.get('/product/'+id);
  }

  getAll(){
    return this.http.get('/product/all');
  }

  save(product:Product){
    return this.http.post('/product',product);
  }

}
