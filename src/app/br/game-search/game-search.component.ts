import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as moment from 'moment';


import { GameSrhService } from './services/game-srh.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit {
  constructor(private srv:GameSrhService) {}  

 

  ngOnInit() { }
}


