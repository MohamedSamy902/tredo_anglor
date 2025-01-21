import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { ShippingService } from 'src/app/core/services/admin/shipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.scss'],
})
export class AddShippingComponent implements OnInit {
  addShipping: FormGroup;
  isSubmited = false;
  id: string;
  constructor(
    private fb: FormBuilder,
    private shippingService: ShippingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addShipping = this.fb.group({
      nameAr: ['', [Validators.required]],
      nameEn: ['', [Validators.required]],
    });
    this.route.params.subscribe((res) => {
      if (res['id']) this.getCityById(res['id']);
    });
  }

  getCityById(id: string) {
    if (this.id) this.id = id;
    this.shippingService.getShippingById(id).subscribe((res) => {
      this.addShipping.patchValue(res);
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.addShipping.valid) {
      this.shippingService
        .addshipping(this.addShipping.value, this.id)
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
          });
          this.router.navigate(['/admin/shippings']);
        });
      this.isSubmited = false;
    }
  }
}
