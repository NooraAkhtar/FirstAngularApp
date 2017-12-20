import { Component, OnInit } from '@angular/core';
import { product } from './Product';
import { ActivatedRoute, Router} from '@angular/router'

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle:string = "Product Detail: ";
  selectedProduct:product;

  constructor(private _route: ActivatedRoute,
              private _router: Router) {

   }

  ngOnInit() {
    var id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle = this.pageTitle + id;
    this.selectedProduct = {
      id: id,
      name: "Lake Reef",
      code: 'Aw-102',
      available: true,
      price: 245.343,
      rating: 3.2,
      imageWidth: 50,
      imageMargin:2,
      imageUrl: "https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      
    };
  }

  onBack():void{
    this._router.navigate(['/products']);
  }

}
