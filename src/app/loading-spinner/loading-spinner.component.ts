import { Component, OnInit } from '@angular/core';
import { slideBootom, fadeIn, fadeOut } from 'app/animations/animations'

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
