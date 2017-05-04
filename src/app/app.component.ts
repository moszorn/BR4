
import { Component, ViewChild } from '@angular/core';



import * as moment from 'moment';
import 'moment-timezone';
import * as _ from 'lodash';

import { UtilService} from './shared/services/util.service';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!!!!';
  constructor(private util:UtilService){
    if(console.clear)console.clear();
    let dbg = false;
      if(dbg)
      {
        console.log("AppComponent 美東物件 %o" , util.meidon);
        let taipeiTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        console.log('AppComponent - %c台北時間 , moment: %s , ', "color:purple",taipeiTime);
        console.log('AppComponent - %c美東時間 , moment: %s , %s', "color:blue",util.meidon.yesterdayWithoutTime, util.meidon.yesterday);

        console.log('[AppComponent] lodash working:', _.union([2], [1, 2]));
        console.log('[AppComponent] moment working: ', moment(new Date).format('YYYY-MM-DD HH:mm:ss'));
        console.log('OverallService - %c美東時間 , moment: %o', "color:blue",moment.tz("America/New_York").format('YYYY-MM-DD HH:mm:ss'));
      }
  }
}
