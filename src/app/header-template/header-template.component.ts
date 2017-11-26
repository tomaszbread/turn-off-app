import { Component, trigger, state, style, transition, animate, keyframes, OnInit } from '@angular/core';
import { slideBootom, fadeIn } from 'app/animations/animations'
export const { BrowserWindow } = require('electron').remote;
@Component({
  selector: 'header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss'],
  animations: [fadeIn]
})

export class HeaderTemplateComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  minimalClick(event) {
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();

  }
  closeClick(event) {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
  }
}
