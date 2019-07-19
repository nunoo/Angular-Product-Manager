import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProduct = {
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
    private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._httpService.newProduct(this.newProduct).subscribe(data => {
      console.log(data)
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
        this.newProduct = {
          'title': '',
          'price': '',
          'url': '',
        }
        this.goHome();
      }
    })
  }

  goHome() {
    this._router.navigate(['/list']);
  }
}
