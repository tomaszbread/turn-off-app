import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SetTimeFromTimerService } from 'app/set-time-from-timer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { CustomZeroPipe } from 'app/custom-zero.pipe';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [],

})
export class TimerComponent implements OnInit {
  timerHours: any = "00"
  timerMinutes: any = "00"
  timeH: any
  close: boolean = true
  showFormatHour: boolean = true
  showFormatMinutes: boolean = true
  intervalVar
  formHour = new FormControl();
  formMinutes = new FormControl();
  @Output() emitMessageClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitMessageShowFormatH: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitMessageShowFormatM: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private SetTimeFromTimerService: SetTimeFromTimerService, private customZero: CustomZeroPipe) {
  }
  ngOnInit() {

  }

  valueValidatorHour(param) {
    this.emitMessageShowFormatH.emit(false);
    var paramNumber = Number(param)
    if (param.length < 2) {
      if (paramNumber < 10) {
        this.timerHours = new CustomZeroPipe().transform(param)
      }
    }
    if (paramNumber > 24) {
      this.timerHours = "00"
      this.formHour.setValue("00")
      this.emitMessageShowFormatH.emit(this.showFormatHour);

    }
    if (param == "") {
      this.timerHours = "00"
      this.formHour.setValue("00")
    }
    if (param.length == 2 && paramNumber <= 24) {
      this.timerHours = param;
    }
  }
  valueValidatorMinutes(param) {
    this.emitMessageShowFormatM.emit(false);
    var paramNumber = Number(param)
    if (param.length < 2) {
      if (paramNumber < 10) {
        this.timerMinutes = new CustomZeroPipe().transform(param)
      }
    }
    if (param == "") {
      this.timerMinutes = "00"
      this.formMinutes.setValue("00")
    }
    if (paramNumber > 60) {
      this.timerMinutes = "00"
      this.formMinutes.setValue("00")
      this.emitMessageShowFormatM.emit(this.showFormatMinutes);
    }
    if (param.length == 2 && paramNumber <= 60) {
      this.timerMinutes = param;
    }
  }
  setTime(timerHours, timerMinutes) {

    this.emitMessageClose.emit(this.close);
    this.emitMessageShowFormatH.emit(false);
    this.emitMessageShowFormatM.emit(false);
    var hour = timerHours
    var minute = timerMinutes
    var timeArray = [hour, minute]
    var time = "" + hour + ":" + minute + ":" + "00";
    var sendToCountDown = this.SetTimeFromTimerService.setTime(time);
  }
  upHoursClick(timerHours) {
    this.emitMessageShowFormatH.emit(false);
    this.timerHours = Number(timerHours)
    this.emitMessageClose.emit(this.close);
    this.timerHours += 1;
    this.timerHours = new CustomZeroPipe().transform(this.timerHours, 'pipeFilter')

    if (this.timerHours === 25) {
      this.timerHours = "00";
    }
  }
  downHoursClick(timerHours) {
    this.emitMessageShowFormatH.emit(false);
    this.timerHours = Number(timerHours)
    this.emitMessageClose.emit(this.close);
    this.timerHours -= 1;

    if (this.timerHours === -1) {
      this.timerHours = 24;
    }
    else {
      this.timerHours = new CustomZeroPipe().transform(this.timerHours, 'pipeFilter')
    }
  }
  upMinutesClick(timerMinutes) {
    this.emitMessageShowFormatM.emit(false);
    this.timerMinutes = Number(timerMinutes)
    this.emitMessageClose.emit(this.close);
    this.timerMinutes += 1;
    this.timerMinutes = new CustomZeroPipe().transform(this.timerMinutes, 'pipeFilter')
    if (this.timerMinutes === 61) {
      this.timerMinutes = "00";
    }
  }
  downMinutesClick(timerMinutes) {
    this.emitMessageShowFormatM.emit(false);
    this.timerMinutes = Number(timerMinutes)
    this.emitMessageClose.emit(this.close);
    this.timerMinutes -= 1;
    if (this.timerMinutes === -1) {
      this.timerMinutes = 60;
    }
    else {
      this.timerMinutes = new CustomZeroPipe().transform(this.timerMinutes, 'pipeFilter')
    }
  }

  upMinutes() {
    this.emitMessageClose.emit(this.close);
    this.intervalVar = setInterval(() => {
      this.timerMinutes += 1;
      if (this.timerMinutes === 61) {
        this.timerMinutes = 0;
      }
    }, 100);
  }
  downMinutes() {
    this.emitMessageClose.emit(this.close);
    this.intervalVar = setInterval(() => {
      this.timerMinutes -= 1;
      if (this.timerMinutes === -1) {
        this.timerMinutes = 60;
      }
    }, 100);
  }
  clear() {
    clearInterval(this.intervalVar);
  }


}
