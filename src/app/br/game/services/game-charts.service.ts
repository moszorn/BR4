import { Injectable,Injector } from '@angular/core';
import {Http, Response, Headers, RequestOptions , URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { finItem , queryObject, finObject } from '../../../shared/models/tdmy.model';

import {StaticService} from '../../../shared/services/static.service';

@Injectable()
export class GameChartsService  extends StaticService{

  constructor(private _injector:Injector,private http: Http) {
      super(_injector);
  } 
/********************************Line Data************************************************ */
   async getFiveLineChartData(queryObj: queryObject): Promise<any> {
   const barChartParams: URLSearchParams = this.getLineChartURLSearchParams(queryObj),
         barUrl = `api/gameList/linechart`,result = {},
         lineData = await this.fiveLineData(barUrl,barChartParams);

      result['payoffSums']= lineData.payoffSums;
      result['commissionableSums']=lineData.commissionableSums;
      result['wagersCounts']=lineData.wagersCounts;
      result['bite']= lineData.bite;
      result['memberCounts']= lineData.memberCounts;
    
      return result;
 }
  private async fiveLineData(url:string, params: URLSearchParams)
  {   
    let result:any;  
    await this.httpGet2(url, params).then(data=>{ 
      let commissionableSums =  this.lineDataOrganising(data.commissionableSums,'有效投注'),
          payoffSums  =  this.lineDataOrganising(data.payoffSums,'損益'),
          wagersCounts  =  this.lineDataOrganising(data.wagersCounts,'投注單量'),
          bite = this.lineDataOrganising(data.bite,'營收比'),
          memberCounts = this.lineDataOrganising(data.memberCounts,'有效投注會員');
          result = {
            payoffSums, commissionableSums , wagersCounts , bite , memberCounts
          };
    });//eof http 
    return result;
  }

/**dateEnd=2017-03-10&groupType=M */
private getLineChartURLSearchParams(obj: queryObject): URLSearchParams {
    let p:URLSearchParams = new URLSearchParams();
    p.set('dateEnd', obj.dateEnd);
    p.set('groupType',obj.queryType );
    p.set('dataCount', obj.dataCount);
    return p;
}

/**依 DMY 取的是查詢日期字串  */
public getDateStringByDWM(searchBy: string): string {
  let queryDate: string ;  
   switch (searchBy){
      case 'D': queryDate= this.util.meiDonYesterday.end.string; break;
      case 'W': queryDate = this.util.getMeiDonThisWeekToday.start.string; break;
      case 'M': queryDate = this.util.getMeiDonThisMonthToday.start.string; break;
      default:
       queryDate = this.util.meiDonYesterday.end.string;
    }
    return queryDate;
}

private lineDataOrganising(datas:any , kind: string): any[]{ 
    let result = [];
   _.forEach(datas,(item,idx)=>{
          item.name = item.name.split('~')[0].replace(/\//gi,'-');
   });
   result.push({name: kind,series: datas});
   return result;
}

/** Expose util  */
public get meiDon  (){
  return this.util.meidon;
}
/********************************Eof Line Data************************************************ */

/***
 * URL: http://br-api.losade.info/api/gamereport/chart?date=2017-01-01&gameGroupType=Category | GameHall | GameHallType
 * 種類 : 1
 * 娛樂城 :2
 * 娛樂廳 :3
 */
/**
 * 種類查詢參數
 */
 category_parameter:number = 1;
 /**
  * 娛樂城查詢參數
  */
 gameHalls_parameter:number = 2;

 /**
  * 娛樂廳查詢參數
  */
 gameHall_parameter:number = 3;

 URL = `api/gamereport/chart`;
 /** date=2017-01-01&gameGroupType=Category
  * queryDate: yyyy-MM-dd
  * queryType: 查詢種類,娛樂城,娛樂廳型態參數
  *            Category | GameHall | GameHallType or 1 | 2 | 3
  */
private getPieChartURLSearchParams(queryDate:string, queryType:number): URLSearchParams {
    let p:URLSearchParams = new URLSearchParams();
    p.set('date', queryDate);
    p.set('gameGroupType', queryType.toString() );
    return p;
}

  getDonutChartBarChatData(queryDate:string, queryType:number): Observable<any> {
   const chartParams: URLSearchParams = this.getPieChartURLSearchParams(queryDate,queryType),
         barUrl = `api/gamereport/chart`;  
      return   this.httpGetObserverable(barUrl,chartParams);
 }



/*
 async getDonutChartBarChatData(queryDate:string, queryType:number): Promise<any> {
   const chartParams: URLSearchParams = this.getPieChartURLSearchParams(queryDate,queryType),
         barUrl = `api/gamereport/chart`;  
      return  await this.donutChartBarChatData(barUrl,chartParams);
 }
 
  private async donutChartBarChatData(url:string, params: URLSearchParams)
  {   
    let result:any;

    await this.httpGet2(url, params).then(data=>{       
       let
         payoffSums10Bar = data.payoffSums ,
         commissionableSumsPieData  = data.commissionableSums ,
         wagersCountsPieData = data.wagersCounts ,
         bitePieData = data.bite ,
         memberCountsPieData = data.memberCounts ;

      result = {
         payoffSums10Bar 
        ,commissionableSumsPieData 
        ,wagersCountsPieData
        ,bitePieData 
        ,memberCountsPieData
      };

    });//eof http 
    console.log('[game-charts.service]%c result: %o','color:green',result );
    return result;
  }
*/

}
