import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {product} from "./product"
import { ProductService } from "./product.service";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Navigation } from "selenium-webdriver";

@Component({
    selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent
                implements OnInit{
    private productService: ProductService;
    productName: any[];
    pageTitle: string='Products';
    products: any[];
    imageWidth:number=50;
    imageMargin: number = 2;
    showImage:boolean=false;
    errorMessage:any;
    _listFilter:string;
    selectedProduct: product;
   
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.listFilter? this.getFilteredProduct(this.listFilter): this.products;
    }

    filteredProducts:product[];

    constructor(private _productService: ProductService, private _route: ActivatedRoute,
        private _router: Router){
        this.productService = _productService;      
        
        this.filteredProducts = this.products;
        this.listFilter = '';
    }
    
    ngOnInit(): void {
        console.log('Page Initialised'); 
        this.getProducts();
    }

    getProducts(){ 
        this.productService.getProduct()
        .subscribe(
            products => {
                this.products = products;
                this.filteredProducts = products;
            },
            error => {
                this.errorMessage = <any>error;
                this.pageTitle = this.errorMessage;
            });
      
    }

    toggleImage(): void{
        this.showImage =!this.showImage;
    }

    getFilteredProduct(productName: any): any {
        productName = productName.toLocaleLowerCase();

        return this.products.filter((filterProduct: product) =>
            filterProduct.name.toLocaleLowerCase().indexOf(productName)!== -1);
    }
    
    onRatingClicked(message:string):void{
        this.pageTitle = message;
    }

    onEdit(product: product): void{      
        this._router.navigate(['/addProduct', product.id]);
    }   
}
