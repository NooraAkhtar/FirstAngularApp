import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductGuardService implements 
            CanActivate {
  router: Router;

  constructor(_router: Router) {
    this.router = _router;
   }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var id = +route.url[1].path;
    if(isNaN(id) || id< 1){
      alert('Invalid Id');
      this.router.navigate(['\products']);
      return false;
    }
    return true;
  }
}
