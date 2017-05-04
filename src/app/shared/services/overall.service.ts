import { Injectable,Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';


import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';



import {StaticService} from './static.service';

import * as _ from 'lodash';

@Injectable()
export class OverallService extends StaticService {

  constructor(private _injector:Injector,private http: Http) {     
     super(_injector);
  }  
}
