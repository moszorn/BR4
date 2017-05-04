import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import * as _ from 'lodash';
import * as moment from 'moment';


import { GameSrhService } from './services/game-srh.service';

const isDebug = false;

@Component({
  selector: 'game-sort-panel',
  templateUrl: `./game-sort-panel.component.html`,
  styleUrls: ['./game-sort-panel.component.css']
})
export class GameSortComponent implements OnInit {
   
  //GAME_SORT_CATEGORIES = [];
  //GAME_SORT_HALLS_SELECTED = {};

  constructor(private srv:GameSrhService) {}

  ngOnInit() {
      //bullet proof
      if(this.srv.GAME_CODE_NAME_BUTTONS.length === 0 || this.srv.GAME_SORT_CATEGORIES.length === 0)
      {
         this.srv.setFundamental()
        .then( o=>{
         if(isDebug) console.log(`%c[game-sort-panel.component - ngOnInit] srv.GAME_CODE_NAME_BUTTONS = %o, this.GAME_SORT_HALLS = %o,this.GAME_SORT_CATEGORIES = %o,this.srv.GAME_SORT_HALLS_SELECTED = %o`, 'color:blue', this.srv.GAME_CODE_NAME_BUTTONS, this.srv.GAME_SORT_HALLS, this.srv.GAME_SORT_CATEGORIES,this.srv.GAME_SORT_HALLS_SELECTED);
         });
      } else { //from cache
         if(isDebug) console.log(`%cFrom Cache%c[game-sort-panel.component - ngOnInit]srv.GAME_CODE_NAME_BUTTONS = %o, this.GAME_SORT_HALLS = %o,this.GAME_SORT_CATEGORIES = %o,this.srv.GAME_SORT_HALLS_SELECTED = %o`, 'color:red','color:pink',this.srv.GAME_CODE_NAME_BUTTONS,this.srv.GAME_SORT_HALLS,this.srv.GAME_SORT_CATEGORIES, this.srv.GAME_SORT_HALLS_SELECTED);
      }
  }


  gameSort_StatusUpdate(){
     const temp = [];    
     _.forEach(this.srv.GAME_SORT_CATEGORIES, (cat, idx)=>{ 
       if(!(cat.isChecked === void 0))
       {             
         _.forEach(this.srv.GAME_SORT_HALLS[cat.category], (item, idx)=> {
           if(cat.isChecked)  temp.push(item);
         });        
         this.srv.GAME_SORT_HALLS_SELECTED = _.uniqBy(temp, 'name');
       } 
     });
  }


 /*
   get GAME_SORT_HALLS_SELECTED(){
     const temp = [];
    
     _.forEach(this.srv.GAME_SORT_CATEGORIES, (cat, idx)=>{ 
       if(!(cat.isChecked === void 0))
       {             
         _.forEach(this.srv.GAME_SORT_HALLS[cat.category], (item, idx)=> {
               
           item.isChecked = cat.isChecked;

           if(cat.isChecked)  temp.push(item);

         });        
         this.srv.GAME_SORT_HALLS_SELECTED = _.uniqBy(temp, 'name');
       } 
     })
     return this.srv.GAME_SORT_HALLS_SELECTED;
   }
*/
}


/*
 template: `    
 <div class="rsearch_name_panel t-center">
    <div class="button_sort">
    <label *ngFor="let item of srv.GAME_SORT_CATEGORIES" class="btn btn-primary mt-10 w75" [(ngModel)]="item.isChecked"  btnCheckbox>{{item.category}}</label> 
 </div>
 <div class="button_sort2">
 <label *ngFor='let hall of GAME_SORT_HALLS_SELECTED' class="btn btn-primary mt-10 w75" btnCheckbox [(ngModel)]='hall.isChecked'>{{hall.name}}</label>
</div> 

<div class='row'>
  <div class='col-6'>
   <pre>
      {{ srv.GAME_SORT_CATEGORIES | json}}
    </pre>
  </div>
  <div class='col-6'>
   <pre>
      {{ srv.GAME_SORT_HALLS_SELECTED | json}}
    </pre>
  </div>
</div>
</div>
  `,
 */