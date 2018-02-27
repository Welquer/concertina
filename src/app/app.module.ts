import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ParentComponentComponent } from './parent-component/parent-component.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import {ScreenElementInfoService} from "./services/screen-element-info.service";

@NgModule({
  declarations: [
    AppComponent,
    ParentComponentComponent,
    ChildComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ScreenElementInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
