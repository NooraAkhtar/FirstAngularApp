import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductGuardService } from './products/product-guard.service';
import { AddProductComponent } from './products/add-product.component';
import { ItemTemplateComponent } from './drop-down-template/item-template/item-template.component';
import { DropDownComponent } from './drop-down-template/drop-down/drop-down.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent,
    AddProductComponent,
    ItemTemplateComponent,
    DropDownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent, canActivate: [ProductGuardService] },
      { path: 'addProduct', component: AddProductComponent},
      { path: 'addProduct/:product', component: AddProductComponent},
      { path: 'welcome', component: WelcomeComponent },
      
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'},
      
    ])
  ],
  providers: [ ProductGuardService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
