import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { Tree } from '@angular/router/src/utils/tree';
import { Subscription } from 'rxjs/Subscription';

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
}

function ratingRangeFN(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value != undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  errorMessage: any;
  pageTitle: string;
  productFormGroup: FormGroup;
  product: product;
  private productService: ProductService;
  nameErrorMessage: string;
  private sub: Subscription;

  private nameErrors = {
    required: 'Please enter name of the product!',
    minLength: 'Product name should have minimum length 3!'
  }

  get addresses() : FormArray{
    return <FormArray> this.productFormGroup.get('addresses');
  }

  constructor(private fb: FormBuilder, private _productService: ProductService,
     private _route: ActivatedRoute,
    private _router: Router) {
    this.productService = _productService;
  }


  ngOnInit() {
    this.productFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.minLength(3)]],
      available: false,
      rating: ['', ratingRangeFN(1, 10)],
      imageUrl: ['', [Validators.required, Validators.pattern("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$")]],
      sendCatalog: true,

      addresses: this.fb.array([ this.buildAddress() ]),
    });

    var nameControl = this.productFormGroup.get("name");
    nameControl.valueChanges
      .subscribe(value => this.setMessage(nameControl));

    this.sub = this._route.params.subscribe(
      params => {
        var id = +params['product'];
        this.getProductById(id);
      }
    );
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProductById(id: number): void{
    if(id>0){
    this.productService.getProductById(id)
    .subscribe( (product: product) => this.onProductRetrieved(product)
    , (error: any) => this.errorMessage = <any>error);
  }
}

  onProductRetrieved(product: product): void{
    debugger;
    if(this.productFormGroup){
      this.productFormGroup.reset();
    }

    this.product = product;
   
    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
        this.pageTitle = `Edit Product: ${this.product.name}`;
    }

    this.productFormGroup.patchValue({
      name: this.product.name.trim(),
      code: this.product.code.trim(),
      price: this.product.price,
      available: this.product.available,
      rating: this.product.rating,
      imageUrl: this.product.imageUrl.trim(),
    });
  }

  save() {
    this.productService.saveProduct(this.productFormGroup.value);
  }

  setMessage(c: AbstractControl): void {
    this.nameErrorMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.nameErrorMessage = Object.keys(c.errors).map(key =>
        this.nameErrors[key]).join(' ');
    }
  }

  AddressSelected(): void {
    debugger;
    alert(this.productFormGroup.get('addressType').value);
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', [Validators.required, Validators.minLength(3)]],
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  addAddress():void{
    this.addresses.push(this.buildAddress());
  }
}
