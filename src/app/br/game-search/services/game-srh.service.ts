import { Injectable , Injector , OnInit, OnDestroy } from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';


// Thrid party
import * as _ from 'lodash';
import * as moment from 'moment';

import {StaticService} from '../../../shared/services/static.service';

@Injectable()
export class GameSrhService extends StaticService {

      _halls = undefined;
      _categories = undefined;

      //用於panel2 (遊戲類別) , panel3(遊戲名稱)
      GAME_CODE_NAME_BUTTONS = [];
      
      //種類checkbox buttons
      GAME_SORT_CATEGORIES = [];
      //娛樂廳集合物件
      GAME_SORT_HALLS = {};
      //選取的娛樂廳
      GAME_SORT_HALLS_SELECTED = [];
      //Picker
      GAME_SORT_PICKER = [];  //[{head:"体育", items:["BB","MG2"]},{head:"3D", items:["PT2","35ing"]},{head:"AG", items:["捕魚","老虎機"]}]


   constructor(private _injector: Injector) { 
     super(_injector);

    //底下getFundamental()這段不可移除
    this.getFundamental().then(values =>this.preparation());
    
  }

   public async setFundamental() {
    return await this.getFundamental();
   }

    private async getFundamental(){
       let urlInfos = `api/GameHall/infos`,  urlCategories = `api/GameHall/Categories`,
       p1 = new Promise((resolve,j) =>{
          this.httpGetWithoutParms(urlInfos)
           .then(json => { 
              this._halls = json; 
              resolve();
          });
       }),
      p2 = new Promise((resolve,j)=>{         
         this.httpGetWithoutParms(urlCategories)
          .then(json=> {
            this._categories = json;
            resolve();
          }); 
      });
      return Promise.all([await p1,await p2]);
    }
  
  private preparation(){ 
    
    this.gameSort_Buttons();
    this.gameCodeName_Buttons();
   
}

  //panel 1 
  //設定  GAME_SORT_CATEGORIES , GAME_SORT_HALLS_SELECTED
  private gameSort_Buttons(){
    //Catgories
     const targetPty = 'category', step1 = _.uniqBy(this._categories, targetPty);
     this.GAME_SORT_CATEGORIES = _.filter(step1, function (o) { return o[targetPty]; });

          _.forEach(this.GAME_SORT_CATEGORIES,  (uniCat, idx) => {
             
              this.GAME_SORT_HALLS[uniCat.category] = [];

              _.forEach(this._categories,  (game, idx2) => {
                  if (uniCat.category.includes(game.category)) {                     
                      _.forEach(this._halls, (hall, idx3) => {
                          if (game.gameHallId == hall.id)
                              this.GAME_SORT_HALLS[uniCat.category].push({ name: hall.name, isChecked: true, id: hall.id });
                      })
                  }//eof if                     
              });
          });
  }/*gameSort_Buttons */

  //panel 3
   //設定  GAME_CODE_NAME_BUTTONS
  private gameCodeName_Buttons(){
    const byProperties = ['id', 'name', 'isChecked','children'];
      _.forIn(this._halls , (btn , idx) =>{
          let trueBtn = {};        
          _.forIn(byProperties , (pty , index) =>
          {
             trueBtn[pty] = btn[pty] ? btn[pty] :
              pty.includes('isChecked')? false: []; 
          });
           _.forEach( this._categories , (cat , idx2) => {
             if(btn.id === cat.gameHallId) trueBtn['children'].push({ name: cat.name, id: cat.id, hallid: cat.gameHallId , isChecked: false});
          });
         this.GAME_CODE_NAME_BUTTONS.push(trueBtn);
      });
  }
  




 /* 預備方法 */
  private convertToURLSearchParams(obj: any): URLSearchParams {
    let p: URLSearchParams = new URLSearchParams();
    p.set('dateStart1', obj.end.dateStart);
    p.set('dateEnd1', obj.end.dateEnd);
    p.set('dateStart2', obj.start.dateStart);
    p.set('dateEnd2', obj.start.dateEnd);
    return p;
  }

}
