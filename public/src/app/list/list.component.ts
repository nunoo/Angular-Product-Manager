import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllProducts();
  }
  getAllProducts(){
    this._httpService.getAllProducts().subscribe( data =>{
      console.log('got all products!', data)
      this.products = data['data']
    })
  }

  deleteProduct(id){
    this._httpService.deleteProduct(id).subscribe( data =>{
      console.log('deleted')
      this.getAllProducts();
    })
  }
}
