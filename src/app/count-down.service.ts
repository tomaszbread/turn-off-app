import { Injectable } from '@angular/core';

@Injectable()
export class CountDownService {

  private seconds: number;
  public progresSec
  start: boolean;
  timeRender: string
  counterValue


  constructor() { }

  getSec() {
    return this.seconds
  }

  setSec(seconds) {
    this.seconds = seconds
  }


  getTime(sec) {
    return this.secondsToTime(sec)
  }


  secondsToTime(sec) {
    var hours = Math.floor(sec / 3600);
    sec -= hours * 3600;
    var minutes = Math.floor(sec / 60);
    sec -= minutes * 60;
    if (hours < 1) {
      var timeRender = this.leadingZero(minutes) + ':' + this.leadingZero(sec);
      return timeRender

    } else {
      var timeRender = hours + ':' + this.leadingZero(minutes) + ':' + this.leadingZero(sec);
      return timeRender
    }
  }

  leadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
  }


}
