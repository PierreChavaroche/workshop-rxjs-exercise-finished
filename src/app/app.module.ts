import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Exercise01Component } from './01/exercise01/exercise01.component';
import { Exercise02Component } from './02/exercise02/exercise02.component';
import { Exercise03Component } from './03/exercise03/exercise03.component';
import { Exercise04Component } from './04/exercise04/exercise04.component';
import { Exercise06Component } from './06/exercise06/exercise06.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise01Component,
    Exercise02Component,
    Exercise03Component,
    Exercise04Component,
    Exercise06Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
