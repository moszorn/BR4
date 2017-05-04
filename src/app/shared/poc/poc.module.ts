import { NgModule }   from '@angular/core';
import { SharedModule } from '../shared.module';


import { PocRouting } from './poc-routing.module';

import { PocComponent} from './poc.component';




@NgModule({
  imports: [
    SharedModule,
    PocRouting
  ],
  declarations: [PocComponent],
  providers:[]
})
export class PocModule { }


