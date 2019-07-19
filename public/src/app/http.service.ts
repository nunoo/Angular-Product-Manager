import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllProducts(){
    return this._http.get('/products')
  }
  newProduct(products){
    return this._http.post('/new', products)
  }
  deleteProduct(id){
    return this._http.delete(`/products/${id}`)
  }
  editProduct(product){
    return this._http.put(`/products/${product._id}`, product)
  }
  getProduct(id){
    return this._http.get(`/products/${id}`)
  }

} 