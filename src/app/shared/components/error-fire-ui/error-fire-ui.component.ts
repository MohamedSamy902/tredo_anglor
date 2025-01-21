import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorFireModel } from 'src/app/core/models/Shared/ErrorFireModel';
import { ErrorFireService } from 'src/app/core/services/error-fire.service';

@Component({
  selector: 'app-error-fire-ui',
  templateUrl: './error-fire-ui.component.html',
  styleUrls: ['./error-fire-ui.component.scss']
})
export class ErrorFireUiComponent implements OnInit {
  ThisModel:ErrorFireModel;
  public displayQickMessage: boolean = false;
  display: boolean = false;
  public displayMesseage: string;
  IsShow: Subject<boolean> = this.errorFireService.IsShowing;
  MSG: Subject<string> = this.errorFireService.MSG;
  Error: Subject<ErrorFireModel> = this.errorFireService.Error;
  constructor(private errorFireService: ErrorFireService) {
  }

  ngOnInit() {
    this.Error.subscribe((data) => {
      console.log(data);
      if (data.ErrorID > 0) {
         this.display = true;
         this.ThisModel = data;
      }
    });

  }
  ShowHeaderBriefMessage() {
    this.displayQickMessage = true;
  }
  hideoverlay() {
    this.display = false;
  }
}
