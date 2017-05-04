import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment'; moment.locale('zh-cn');

@Component({
  selector: 'app-br-page',
  templateUrl: './br-page.component.html',
  styleUrls: ['./br-page.component.css']
})
export class BRPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  time_nowshow =  moment().format('YYYY-MM-DD (ddd) HH:MM');
}
