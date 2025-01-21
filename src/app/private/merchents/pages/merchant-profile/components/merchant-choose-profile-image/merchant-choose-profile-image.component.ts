import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-merchant-choose-profile-image',
  templateUrl: './merchant-choose-profile-image.component.html',
  styleUrls: ['./merchant-choose-profile-image.component.scss']
})
export class MerchantChooseProfileImageComponent implements OnInit {

  @Output() onChooseMerchantImage: EventEmitter<any> = new EventEmitter();
  @Input() imgSrc: string | null | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }

  public uploadFile(event: any) {
    if (event) {
      var reader = new FileReader()
      reader.readAsDataURL(event[0])
      reader.onload = (event) => {
        let fileReader = event.target as FileReader;
        this.imgSrc = fileReader.result!;
        this.onChooseMerchantImage.emit(fileReader.result);
      }
    }
  }
}
