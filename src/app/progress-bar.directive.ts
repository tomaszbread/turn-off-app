import { Directive, ElementRef, Input, Output, Renderer, ViewChild, EventEmitter, HostBinding } from '@angular/core';
@Directive({
  selector: '[progressBar]',
  inputs: ['time']

})

export class ProgressBarDirective {

  @HostBinding('style.width.%')
  @Input() widthVal: number = 0;
  @Input() time: number;
  public seconds: number;
  public milisecond: number;


  constructor(private el: ElementRef, private renderer: Renderer) {

  };

  move(diff) {
    var thiObj = this;
    var width = 0;
    var diff = diff 
    var id = setInterval(frame, 1000);

    function frame() {
      if (width >= 101) {
        clearInterval(id);
      } else {
        width += diff
        thiObj.widthVal = width;

      }
    }

  }


  ngOnInit(): void {
    var diff =  100 / this.time
    this.move(diff)
  }

}
