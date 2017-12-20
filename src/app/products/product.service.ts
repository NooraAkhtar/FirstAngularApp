import { product } from "./product";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { allResolved } from "q";
import { error } from "util";

@Injectable()
export class ProductService{
    private http: HttpClient;
   
    private products: product[];
    constructor(private _http: HttpClient){
        this.http = _http
    }

    getProduct(): Observable<product[]>{
        var productServiceURL ="http://localhost:63518/api/values";
        return this.http.get<product[]>(productServiceURL);
        
    }

    getProductById(id: number): Observable<product>{
        var productServiceURL ="http://localhost:63518/api/values/" + id;
        return this.http.get<product>(productServiceURL);
    }

    saveProduct(product: product){
        var productServiceURL ="http://localhost:63518/api/values/save";
        this.http.put(productServiceURL, product);
    }
}