import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  constructor(private authSrevice: AuthService, private router: Router) {}

  canActivate(){
    if (this.authSrevice.GetLoginUser().userType!=1) {
      return true;
    }
    else {
       this.router.navigate(['admin'])

      return false;
    }
  }
  
}
