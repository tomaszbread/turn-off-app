import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderTemplateComponent } from './header-template/header-template.component';
import { FirstpageContentComponent } from './firstpage-content/firstpage-content.component';
import { ShutdownOptionsComponent } from './shutdown-options/shutdown-options.component';
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component';
import { CountDownComponent } from './count-down/count-down.component';
import { CountDownService } from 'app/count-down.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LikeBackgroundSvgComponent } from './like-background-svg/like-background-svg.component';
import { TimerComponent } from './timer/timer.component';
import { CustomZeroPipe } from './custom-zero.pipe';
import { SetTimeFromTimerService } from 'app/set-time-from-timer.service';
import { ProgressBarDirective } from './progress-bar.directive';
import { NgxElectronModule } from 'ngx-electron';
import { OnlyNumberDirective } from './only-number.directive';
import { LimitToDirective } from './limit-to.directive';
import { DebounceDirective } from './debounce.directive';

import { ReactiveFormsModule, FormControl } from '@angular/forms';

const routesConfig: Routes = [
  { path: '', component: FirstpageContentComponent },
  { path: 'shutdownOptions', component: ShutdownOptionsComponent },
  { path: 'countDown', component: CountDownComponent },
]

const routerModule = RouterModule.forRoot(routesConfig, {
  enableTracing: true,
  useHash: true
})


@NgModule({
  declarations: [
    AppComponent,
    HeaderTemplateComponent,
    FirstpageContentComponent,
    ShutdownOptionsComponent,
    CountDownComponent,
    LoadingSpinnerComponent,
    LikeBackgroundSvgComponent,
    TimerComponent,
    CustomZeroPipe,
    ProgressBarDirective,
    OnlyNumberDirective,
    LimitToDirective,
    DebounceDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    routerModule,
    NgxElectronModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: CountDownService, useClass: CountDownService },
    { provide: SetTimeFromTimerService, useClass: SetTimeFromTimerService },
    { provide: CustomZeroPipe , useClass: CustomZeroPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
