import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { slideBootom, fadeIn, fadeOut } from 'app/animations/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'firstpage-content',
  templateUrl: './firstpage-content.component.html',
  styleUrls: ['./firstpage-content.component.scss'],
  animations: [slideBootom]
})
export class FirstpageContentComponent {
  state: string = 'active';
  spinnerIsRunning = true
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('/shutdownOptions');
    }, 3500)


  }



  ngOnInit() {
  }
}
