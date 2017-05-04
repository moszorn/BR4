import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';


import { GameSrhService } from './services/game-srh.service';

@Component({
  selector: 'game-code-name-panel',
  templateUrl: './game-code-name-panel.component.html',
  styleUrls: ['./game-code-name-panel.component.css']
})
export class GameCodeNameComponent implements OnInit {

   //panel 1 游戏种类
   GAME_CODE_NAME_BUTTONS: Array<any>;

  constructor(private srv:GameSrhService) { 

  }

  ngOnInit() {
     this.GAME_CODE_NAME_BUTTONS = this.srv.GAME_CODE_NAME_BUTTONS;
     //console.log(`[game-code-name-panel.component ngOnInit]: %o`, this.GAME_CODE_NAME_BUTTONS);
  }

   get game_sort_buttons_byHall(){
    return _.flatMap(
      _.filter(this.GAME_CODE_NAME_BUTTONS, ['isChecked', true]),'children'
    )
  }

}
