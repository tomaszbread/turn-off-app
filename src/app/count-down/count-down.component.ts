import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountDownService } from 'app/count-down.service'
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'countdown',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit {

  public timeRender: string;
  public counterValue: any;
  public sec: number;
  public setTimeoutFunc: any;

  @Input() seconds: any;
  @Input() start: boolean;
  @Input() countDownOptions: boolean;
  @Input() countDownStart: boolean;
  @Output() shutdownView: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private router: Router, private countDownService: CountDownService, private _electronService: ElectronService) {

  };

  stopCountDown() {

    clearTimeout(this.setTimeoutFunc);
    var sec = 0;
    this.start = false
    this.shutdownView.emit(this.start)



  };

  public shutdownIsComing() {
    if (this._electronService.isElectronApp) {
      let shutdownIsComing = true;
      let pong: boolean = this._electronService.ipcRenderer.sendSync('shutdownIsComing', shutdownIsComing);
    }
  }


  countDownFrom(sec) {
    if (this.start == true) {
      if (sec > 0) {
        this.timeRender = this.countDownService.getTime(sec);
        this.setTimeoutFunc = setTimeout(() => {
          this.counterValue = this.countDownFrom(sec = sec - 1)
          this.timeRender = this.countDownService.getTime(sec);
        }, 1000);
      } else {
        sec = 0;
        if (sec == 0) {
          this.shutdownIsComing()
        }
      }
    }
    return sec;
  }


  secondsToTime(sec) {
    var hours = Math.floor(sec / 3600);
    sec -= hours * 3600;
    var minutes = Math.floor(sec / 60);
    sec -= minutes * 60;
    if (hours < 1) {
      return this.leadingZero(minutes) + ':' + this.leadingZero(sec);

    } else {
      return hours + ':' + this.leadingZero(minutes) + ':' + this.leadingZero(sec);
    }
  }

  leadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
  }




  ngOnInit() {
    this.countDownFrom(this.seconds);
  }

}

