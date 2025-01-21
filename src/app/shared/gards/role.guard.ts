import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
// export class RoleGuard implements CanActivate  {
//   Role
//   constructor(private authSrevice: AuthService, private router: Router,private route:ActivatedRoute) {}
//   ngOnInit() {
// 		this.route.data.subscribe((data) => {
//       this.Role = data['PageRole'];
//       console.log(this.Role)

//     });
//   }
//   canActivate(){
//     if (this.authSrevice.GetLoginUser().userType==1) {

//       return true;
//     }
//     else {
//       // this.router.navigate([''])
//       this.router.navigate(['merchants'])

//       return false;
//     }
//   }

// }

export class RoleGuard {
  static forRoles(...roles: number[]) {
    @Injectable({
      providedIn: 'root'
    })
    class RoleCheck implements CanActivate {
      constructor(private authService: AuthService, private router: Router) { }
      canActivate() {
        if (this.authService.GetLoginUser().userType == 1) {
          const userRole = this.authService.GetRoles();

          let result = userRole.some(r => roles.includes(r.user_RolesId))
          if (result) {
            return result
          } else {
            this.router.navigate(['admin'])
          }
        }
        else {
          this.router.navigate(['merchants'])
          return false;
        }
      }
    }

    return RoleCheck;
  }

}
