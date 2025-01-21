import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  Nav = false;
  constructor(private route: ActivatedRoute, private router: Router,private authService:AuthService) { }
   user 
  ngOnInit(): void {
    if(this.authService.IsLoggedIn()){
      this.user=this.authService.GetLoginUser().userName
    }  }

  openNav() {
    this.Nav = !this.Nav;
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
