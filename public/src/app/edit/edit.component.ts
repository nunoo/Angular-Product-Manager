import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productId;
  product = {
    'title': '',
    'price': '',
    'url': '',
  }
  productError = {
    'title': '',
    'price': '',
    'url': '',
  };
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.productId = params['id']
    });
    this.getOneProduct()
  }

  onSubmit() {
    this._httpService.editProduct(this.product).subscribe(data => {
      console.log('updated product', data)
      this.productError = {
        'title': '',
        'price': '',
        'url': '',
      };
      if (data['message'] == "Error") {
        console.log('There was an error')
        if (data['error']['errors']['title']) {
          this.productError['title'] = data['error']['errors']['title']['message']
        }
        if (data['error']['errors']['price']) {
          this.productError['price'] = data['error']['errors']['price']['message']
        }
        if (data['error']['errors']['url']) {
          this.productError['url'] = data['error']['errors']['url']['message']
        }
      } else {
        console.log('success')
        this.product = {
          'title': '',
          'price': '',
          'url': '',
        }
        this._router.navigate(['/list']);
      }
    })
  }

  getOneProduct() {
    this._httpService.getProduct(this.productId).subscribe(data => {
      console.log('got one product', data)
      this.product = data['data']
    })
  }
}
