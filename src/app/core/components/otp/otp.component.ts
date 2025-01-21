import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OTPComponent implements OnInit {
  page;
  email:string='';
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  @ViewChildren('formRow') rows: any;
  constructor(private router: Router,private authService: AuthService,private route: ActivatedRoute) {
    this.form = this.toFormGroup(this.formInput);
  }
  ngOnInit(): void {
      this.route.queryParams
      .subscribe(params => {
        this.page = params['page'];
        console.log(this.page);
      }
    );
    this.email = this.route.snapshot.paramMap.get('email')!;
    console.log( this.email)
  }
  toFormGroup(elements) {
   const group: any = {};
   elements.forEach(key => {
     group[key] = new FormControl('', Validators.required);
   });
   return new FormGroup(group);
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
     pos = index - 1 ;
    } else {
     pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
     this.rows._results[pos].nativeElement.focus();
    }
   }
   onSubmit(FormValue){
    let opt='';
    const login = {... FormValue };
    Object.entries(login).forEach(([key, value], index) => {
      opt+=value
    });
    this.authService.VerifyWithOtp(this.email,opt).subscribe({
      next: (res) => {
        if(this.page=='forgetpassword')
        this.router.navigate(['auth/resetpassword',this.email]);
        else
        this.router.navigate(['auth/login']);
    },
    error: (err) => {
   
    }})
   }
}
