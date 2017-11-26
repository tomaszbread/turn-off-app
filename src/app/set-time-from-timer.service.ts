import { Injectable } from '@angular/core';

@Injectable()
export class SetTimeFromTimerService {

  constructor() { }
  public timer
  public sec

  getTime() {
    return this.timer
  }

  setTime(time) {
    this.timer = time
  }



}
