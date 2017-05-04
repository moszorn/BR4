
import { Injectable,Injector } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';


import {StaticService} from '../../../shared/services/static.service';


import * as _ from 'lodash';

@Injectable()
export class ReportService  extends StaticService {

 constructor(private _injector:Injector,private http: Http) {
      super(_injector);
  }  

/*
  private Get(queryUrl){
    return this.http.get(this.baseUrl+queryUrl)     
      .toPromise()
      .then(response => response.json())
      .catch(response => this.handlerServiceError);
  }
*/
  

  
  /**
   * 
   * @param dmy = D|W|M
   */
 /*
  public getCardDataByDMY(dmy: string): Promise<any[]>{
     
      let dateObj = this.util.getDateStringByDMY(dmy); 

      let queryUrl = `api/graphic/cards/${dateObj.queryType}/${dateObj.start.string}`;      
        
        return this.Get(queryUrl);
  }


  public getTabularDataByDMY(dmy: string): Promise<any[]>{

     let dateObj = this.util.getDateStringByDMY(dmy); 
     
    let queryUrl = `api/graphic/tables/${dateObj.queryType}/${dateObj.start.string}`;   

      return this.Get(queryUrl);

  }
*/


    private  Get(queryUrl): Observable<any> {
      return this.http.get(this.baseUrl+queryUrl , this.options())
                .map((res: Response) => res.json())
                .catch((error: any) =>
                  Observable.throw(error.json().error || 'Server error')                 
                );
    }



     public getCardDataByDMY(dmy: string): Observable<any>{
     
      let dateObj = this.util.getDateStringByDMY(dmy); 

      let queryUrl = `api/graphic/cards/${dateObj.queryType}/${dateObj.start.string}`;      
        
        return this.Get(queryUrl);
  }


  public getTabularDataByDMY(dmy: string): Observable<any>{

     let dateObj = this.util.getDateStringByDMY(dmy); 
     
    let queryUrl = `api/graphic/tables/${dateObj.queryType}/${dateObj.start.string}`;   

      return this.Get(queryUrl);

  }

}
