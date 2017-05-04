import {Injector} from '@angular/core'
import {  DecimalPipe } from '@angular/common';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';


import {environment} from '../../../environments/environment';

import {UtilService} from './util.service';

//thrid  party
import {ToastyService, ToastOptions , ToastyConfig} from 'ng2-toasty';

//self




export abstract class StaticService {


  protected toastyService:ToastyService;
  private toastyConfig: ToastyConfig;
  private _http: Http;

  protected util:UtilService;

  constructor(private injector:Injector) {    
     
      //Core
      this._http = injector.get(Http);     
      //app self
      this.util = injector.get(UtilService);

      //Thrid party
      this.toastyService = injector.get(ToastyService);
      this.toastyConfig = injector.get(ToastyConfig);
      
      this.toastyConfig.theme = 'material';// material,bootstrap,default
      this.toastyConfig.position = 'bottom-right';//bottom-right,top-center
  }


  
   get baseUrl(): string {
      return environment.host;
    };

 protected httpGetObserverable(url: string , params: URLSearchParams = undefined): Observable<any> {
      return this._http.get(this.baseUrl + url, {search:params})
              .map(response=> response.json())
              .catch(this.handlerServiceError)
  }



 //會員報表卡牌會用到這個method
 protected httpGet(url: string, query: any , cb: Function): Promise<any[]>{ 
      return this._http.get(this.baseUrl+url)
                .toPromise()
                .then(response => cb(response.json(),query , this.util) )
                .catch(error=> {
                    this.handlerServiceError(error);                 
                });
  } 

  protected async httpGet2(url: string, params: URLSearchParams): Promise<any>{
       return await this._http.get(this.baseUrl+url,{search:params})
                .toPromise()
                .then(response => response.json())
                .catch(error=> {
                    this.handlerServiceError(error);
                });
  }


  protected async httpGetWithoutParms(url: string): Promise<any>{
       return await this._http.get(this.baseUrl+url)
                .toPromise()
                .then(response => response.json())
                .catch(error=> {
                    this.handlerServiceError(error);
                });
  }







  //Request , Response
  protected options = () =>{
        return new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'token goes here //TODO'
            })
        })
    };

  protected extractData = (res:Response) => {
    //TODO
    if (res.status != 204) return res.json() || {}
        return {}
  };

   protected handlerServiceError (error: any) { 
        this.toastyError(error || 'Server Error 505');
        if (error instanceof Response) {          
            return Observable.throw(error.status || 'Server Error 505');
        } 
        return Observable.throw(error || 'Server Error 505');
    }
 
 //toasty
  protected toastyInfo = (message: string, title: string = '提示') => {
        const toastOptions:ToastOptions = {
            title: title,
            msg: message
        }
        this.toastyService.info(toastOptions);
    };

    protected toastySuccess = (message: string, title: string = '成功') => {
        const toastOptions:ToastOptions = {
            title: title,
            msg: message
        }
        this.toastyService.success(toastOptions);
    };
    protected toastyError = (message: string, title: string = '错误提示') => {
       
        const toastOptions:ToastOptions = {
            title: title,
            msg: message
        }
        
        this.toastyService.error(toastOptions);
    };  

    /*_______________________________________________________________________________________________*/

  
}