
import { Injectable,Injector } from '@angular/core';
import {Http, Response, Headers, RequestOptions , URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';


import { dmemberQueryDateObject } from '../../../shared/models/tdmy.model';
import {StaticService} from '../../../shared/services/static.service';




@Injectable()
export class DmemberService  extends StaticService {

 

 constructor(private _injector:Injector,private http: Http) {
      super(_injector);
  } 

  public reportListObserverable(queryObj: dmemberQueryDateObject): Observable<any[]> {  
     const params: URLSearchParams = this.reportListURLSearchParams(queryObj),
         _url = `api/memberadvance/search`;

      return this.http.get(this.baseUrl + _url , {search:params})
            .map(result=>result.json())
            .catch(this.handlerServiceError);  
  }

 async reportList(queryObj: dmemberQueryDateObject): Promise<any> {   
    const params: URLSearchParams = this.reportListURLSearchParams(queryObj),
         _url = `api/memberadvance/search`;
   return await this.getReportList(_url,params); 
 }

private reportListURLSearchParams(obj: dmemberQueryDateObject): URLSearchParams{
  let p:URLSearchParams = new URLSearchParams();
    p.set('dateStart', obj.dateStart );
    p.set('dateEnd', obj.dateEnd);
    p.set('isCompanyDeposit', obj.isCompanyDeposit);
    p.set('isOnlinePay', obj.isOnlinePay);
    p.set('depositAmount1', obj.depositAmount1);
    p.set('depositAmount2', obj.depositAmount2);
    p.set('depositTimes1', obj.depositTimes1);
    p.set('depositTimes2', obj.depositTimes2);
    p.set('commissionable1', obj.commissionable1);
    p.set('commissionable2', obj.commissionable2);
    p.set('payoff1', obj.payoff1);
    p.set('payoff2', obj.payoff2);
    p.set('wagersCount1', obj.wagersCount1);
    p.set('wagersCount2', obj.wagersCount2);
    p.set('diffDays', obj.diffDays);
    p.set('page', obj.page);
    p.set('itemsPerPage', obj.itemsPerPage);
    return p;
}


private async getReportList(url:string, params: URLSearchParams): Promise<any>
{   
  //let items:any,currentPage:number,totalPages:number,totalItems:number,itemsPerPage:number;
  let items:any,totalItems:number,currentPage:number,totalPages:number;
 
  await this.httpGet2(url, params).then(data=>{

    items = _.forEach(data.items,(item,idx)=>{
      item.index = (data.currentPage - 1) * data.itemsPerPage + (idx + 1)
      item.joinTime = item.joinTime.replace('T00:00:00','');
      item.wagersTime = item.wagersTime.replace('T00:00:00','');
  });

 //currentPage = data.currentPage;totalPages = data.totalPages;totalItems = data.totalItems;itemsPerPage = data.itemsPerPage;    
 totalItems = data.totalItems;
 currentPage = data.currentPage;
 totalPages = data.totalPages;
 });//eof http
 return { items, totalItems , currentPage , totalPages};

}


}
