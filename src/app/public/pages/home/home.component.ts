import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  shippingForm: FormGroup;
  isSubmited = false;
  selectedOption;
  shippingWayControl: FormControl;
  constructor(private fb: FormBuilder) {
    this.shippingForm = this.fb.group({
      shippingWay: ['', Validators.required],
      type: ['نوع الشحنة', Validators.required],
      startPoint: ['نقطة الانطلاق', Validators.required],
      endPoint: ['نقطة التسليم', Validators.required],
      count: ['', Validators.required],
    });
    this.shippingForm?.get('shippingWay')?.valueChanges.subscribe(value => {
      this.selectedOption = value;
    });
  }

  shippingOptions = [
    { value: 'merchant', name: 'option1', arName: 'متجر  ' },
    { value: 'person', name: 'option1', arName: 'علامة تجارية' },
  ];

  ngOnInit(): void {

  }

  onOptionChange(event: any, optionValue: string) {
    if (event.target.checked) {
      this.selectedOption = event.target.value;
      this.shippingForm.controls[optionValue].setValue(event.target.value);
    } else {
      this.selectedOption = null;
      this.shippingForm.controls[optionValue].setValue(null);
    }
  }


  getOptionClass(option: any) {
    return {
      'active': option.value === this.selectedOption
    };
  }


  menuSwitch = [
    { id: 1, name: 'Local shipping', arName: 'شحن محلي', img: '' },
    { id: 2, name: 'International shipping', arName: 'شحن دولي', img: '' },
  ];
  selectedSwitch = 'Local shipping';
  selectTab(item) {
    this.selectedSwitch = item;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.shippingForm.valid) {
      this.isSubmited = false;
      console.log(this.shippingForm.value);
    }
  }
}
