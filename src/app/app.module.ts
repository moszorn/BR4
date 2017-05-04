import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/Rx';

import {SharedModule} from './shared/shared.module';
import { BRModule } from './br/br.module';
import { PocModule } from './shared/poc/poc.module';

/** root Component goes here */
import { AppComponent } from './app.component';
import { NavTopComponent } from './shared/nav-top/nav-top.component';

/** Third party goes here */
//import {NgxChartsModule} from '@swimlane/ngx-charts';
//import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';


import {GameSrhService} from './br/game-search/services/game-srh.service';



/**ng2-bootstrap */


@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent   
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BRModule,
    PocModule,
    SharedModule
  ],
  providers: [GameSrhService],
  bootstrap: [AppComponent]
})
export class AppModule { }
