import { Component, trigger, state, style, transition, animate, keyframes, OnInit, Directive } from '@angular/core';
import { slideBootom, fadeIn } from 'app/animations/animations';
import { CountDownService } from 'app/count-down.service';
import { SetTimeFromTimerService } from 'app/set-time-from-timer.service'


@Component({
  selector: 'shutdown-options',
  templateUrl: './shutdown-options.component.html',
  styleUrls: ['./shutdown-options.component.scss'],
  animations: [slideBootom, fadeIn]

})

export class ShutdownOptionsComponent implements OnInit {
  time = "00:00:00"
  countDownOptions: boolean = true;
  countDownStart: boolean = false;
  validMessage: boolean = false;
  showFormatHours: boolean = false;
  showFormatMinutes: boolean = false;
  validOption: boolean = false;
  option1: boolean = false;
  option2: boolean = false;
  timeToSeconds: number;
  start: boolean = false;
  isOpen = false;
  optionChoose = "Choose options"
  public info: any

  constructor(private countDownService: CountDownService, private SetTimeFromTimerService: SetTimeFromTimerService) {

  }


  chldComponentResponse(bool: boolean) {
    if (bool == false) {
      this.countDownOptions = true
      this.countDownStart = false;
      this.time = "00:00:00"
      var sendToCountDown = this.SetTimeFromTimerService.setTime(this.time);
      this.option1 = false;
      this.option2 = false;
      this.optionChoose = "Choose options"
    }
  }
  closeMessage(close: boolean) {
    if (close == true) {
      this.validMessage = false
    }



  }
  showFormatTimeHour(showFormatBool){
    if (showFormatBool == true) {
      this.showFormatHours = true 
    }
    else{
      this.showFormatHours = false 
    }
  }
    showFormatTimeMinutes(showFormatBool){
    if (showFormatBool == true) {
      this.showFormatMinutes = true 
    }
    else{
      this.showFormatMinutes = false 
    }
  }

  runCountDown = function ($event) {

    var time = this.SetTimeFromTimerService.getTime()

    if (time == undefined && this.option2 == false && this.option1 == false) {

      this.validMessage = true
      this.validOption = true

    }
    else {

      if (this.option2 == true) {

        this.timeForOption2(time)

      } else if (this.option1 == true) {

        this.timeForOption1(time)

      } else {
        this.validMessage = true
        this.validOption = true
      }


    }


  }


  timeForOption2(time) {
    if (time == undefined || time === "00:00:00") {
      this.validMessage = true
    }
    else {
      var sec = this.timeToSecondMapArray(time)
      this.timeToSeconds = sec
      this.start = true;
      this.countDownOptions = false
      this.countDownStart = true;
    }
  }

  timeForOption1(time) {
    if (time == undefined || time === "00:00:00") {
      this.validMessage = true
    }
    else {

      var currentTime = new Date().toLocaleTimeString();
      var currentTimeMilisec = this.timeToSecondMapArray(currentTime)
      var secondsFromTimer = this.timeToSecondMapArray(time)
      if (secondsFromTimer > currentTimeMilisec) {
        var sec = secondsFromTimer - currentTimeMilisec;
      }
      else {
        var different = currentTimeMilisec - secondsFromTimer;
        var onDayInSec = 86400
        var sec = onDayInSec - different

      }
      this.timeToSeconds = sec
      this.start = true;
      this.countDownOptions = false
      this.countDownStart = true;
    }
  }

  timeToSecondMapArray(time) {
    var time = time
    var part = time.split(':');
    var array = Object.keys(part).map(function (key) { return part[key]; });
    if (array.length === 2) {
      array.splice(2, 0, "00")
    }
    var sec = (+array[0]) * 60 * 60 + (+array[1]) * 60 + (+array[2]);
   
    return sec

  }

  validTime(message) {
    this.optionChoose = message;
    this.validMessage = false
    this.isOpen = false;
    if (this.option1 == false && this.option2 == false) {
      this.optionChoose = "Choose options"
      this.isOpen = false;
    }
  }
  closeForDropdown(event) {
    var target = event.target;
    if (!target.closest(".detailsButton")) {
      this.isOpen = false;
    }
  }

  ngOnInit() {
  }


}

