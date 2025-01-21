import { city } from './../../../../core/models/City';

import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddCityComponent implements OnInit {
  addCity: FormGroup;
  isSubmited = false;
  cityModel: city;
  id: string;
  Regions: any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cityModel = new city();
    this.addCity = this.fb.group({
      nameAr: ['', [Validators.required]],
      nameEn: ['', [Validators.required]],
      geofanceCode: ['', [Validators.required]],
      regionId: ['', [Validators.required]],
    });
    this.route.params.subscribe((res) => {
      if (res['id']) this.getCityById(res['id']);
    });
    this.route.data.subscribe((res) => {
      this.Regions = res['Regions'];
    });
  }

  getCityById(id: string) {
    this.id = id;
    this.adminService.getCityById(id).subscribe((res) => {
      this.addCity.patchValue(res);
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.addCity.valid) {
      this.adminService
        .addCity(this.addCity.value, this.id)
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
          });
          this.router.navigate(['/admin/cities']);
        });
      this.isSubmited = false;
    }
  }
}
