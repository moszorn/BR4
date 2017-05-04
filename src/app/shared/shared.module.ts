import { NgModule , ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';


//Third party
import {ToastyModule} from 'ng2-toasty';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { RangerPickerComponent } from './datepicker/ranger-picker.component';


import {UtilService}  from './services/util.service';
import {StaticService} from './services/static.service';
import {OverallService} from './services/overall.service';

import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  imports: [
    CommonModule,FormsModule,HttpModule,

    ToastyModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    Daterangepicker    
  ],
  declarations: [RangerPickerComponent],
  exports:[CommonModule,FormsModule,ToastyModule,TooltipModule,TabsModule,ButtonsModule,Daterangepicker,RangerPickerComponent],
  providers:[
   OverallService,UtilService
  ]
})
export class SharedModule {

 }
