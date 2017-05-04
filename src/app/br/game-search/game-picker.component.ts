import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'game-picker',
  template: `
  <div class="showpick">
    <div class="showpick_l" [innerText]='head'></div>
    <div class="showpick_r" [innerText]='itemsString'></div>
  </div>
  `,
  styles: [`
  .showpick {
        border: 1px solid #44bbcc;
        display: inline-block;
        border-radius: 2px;
        margin: 3px auto;
        margin-right: 3px;
    }
   .showpick_l {
        display: inline-block;
        width: 42px;
        padding: 5px 0;
        text-align: center;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        color: #fff;
        background: #44bbcc;
    }
     .showpick_r {
        display: inline-block;
        margin-left: -5px;
        width: auto;
        padding: 5px 8px;
        text-align: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        color: #49bdce;
        background: #ccffff;
    }`]
})
export class GamePickerComponent implements OnInit {

  constructor() { }

 @Input() head:string;
 @Input() itemsString:string;

  ngOnInit() {
  }

}


