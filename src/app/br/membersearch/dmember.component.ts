import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as $ from 'jquery';
import * as moment from 'moment'; moment.locale('zh-cn');
import * as _ from 'lodash';

import { dmemberQueryDateObject } from '../../shared/models/tdmy.model';



import { UtilService } from '../../shared/services/util.service';
import { DmemberService } from './services/dmember.service';


const TABLE_PAGE: string = '1',  EMPTY_STRING = '';




@Component({
  selector: 'app-dmember',
  templateUrl: './dmember.component.html',
  styleUrls: ['./dmember.component.css']
})
/**
 * 存款會員 
 */
export class DmemberComponent implements OnInit {
  
   //分頁資訊
  count: number = 0; // The total count of all rows. Default value: 0
  offset: number = 0;  // The current offset ( page - 1 ) shown. Default value: 0
  limit: number = 20;  //The page size to be shown. Default value: undefined.
  loadingIndicator:boolean = false;

  onPage(event) {   
    /*
    console.group('[dmember.component] onPage');
    console.log(`[dmember.component] OnPage offset: ${event.offset}  limit: ${event.limit}`);
    console.log(event);
    console.groupEnd();
     */
    this.page(event.offset, event.limit);
  }

  page(offset, limit) {
   //console.log('[dmember.component] page offset: %o , limit: %o', offset, limit);
   
    let parm = this.getSearchParams();
 
    parm.page = offset+1;
    parm.itemsPerPage = limit.toString();
    this.entries = [];
    this.loadingIndicator = true;
    this.srv.reportList(parm)
          .then((data)=>{
           
              if(!data || !data.items || data.items.length ==0)
              {
                this.entries = [];
              }
              else
              {

               this.count = data.totalItems;

                      const start = offset * limit;
                      const end = start + limit;
                      const rows = [...this.entries]; 

                      let j = 0;
                      for (let i = start; i < end; i++) {
                         rows[i] = data.items[j++];
                       }

                       this.entries = rows;
              }
               this.loadingIndicator = false;         
          });

    /*
    this.srv.reportListObserverable(parm).subscribe((data: any) => {
         console.log('[dmember.component] reportListObserverable %o', data);
                     this.count = data.totalPages;
                      const start = offset * limit;
                      const end = start + limit;
                      const rows = [...this.entries]; 
                      let j = 0;
                      for (let i = start; i < end; i++) {
                         rows[i] = data.items[j++];
                       }

                       this.entries = rows;
                  this.loadingIndicator = false;
    }); */

  } /* eof page */


  //日期
  public dateStart: Date = new Date();
  public dateEnd: Date = new Date();
  
 //查詢日期 
 setStartDate($event){ this.dateStart = $event.startFrom; }
 setEndDate($event){ this.dateEnd = $event.startFrom;}

  //route Subscription
   routeSubscription: Subscription;
  
  entries: any = [];
  //public minDate: Date = void 0;

  //查詢條件欄位
  depositAmount1: Number | string | null;
  depositAmount2: Number | string | null;
  depositTimes1: Number | string | null;
  depositTimes2: Number | string | null;
  commissionable1: Number | string | null;
  commissionable2: Number | string | null;
  payoff1: Number | string | null;
  payoff2: Number | string | null;
  wagersCount1: Number | string | null;
  wagersCount2: Number | string | null;
  diffDays: Number | string | null; 
  /** 
   payments[X]  全部
   payments[0]  公司入款
   payments[1]  线上支付
  */
  payments: boolean[] = [undefined, false, false];

  public constructor(private route: ActivatedRoute,private _http: Http, private util: UtilService, private srv: DmemberService) { }
 
 private getSearchParams(): dmemberQueryDateObject { 
   if(this.isSlideOpen)
    return  {
      dateStart : moment(this.dateStart).format('YYYY-MM-DD'),
      dateEnd: moment(this.dateEnd).format('YYYY-MM-DD'),
      isCompanyDeposit:  String(this.payments[1]),
      isOnlinePay: String(this.payments[2]),
      depositAmount1: this.checkParam(this.depositAmount1),
      depositAmount2: this.checkParam(this.depositAmount2),
      depositTimes1: this.checkParam(this.depositTimes1),
      depositTimes2: this.checkParam(this.depositTimes2),
      commissionable1: this.checkParam(this.commissionable1),
      commissionable2: this.checkParam(this.commissionable2),
      payoff1: this.checkParam(this.payoff1),
      payoff2: this.checkParam(this.payoff2),
      wagersCount1: this.checkParam(this.wagersCount1),
      wagersCount2: this.checkParam(this.wagersCount2),
      diffDays: this.checkParam(this.diffDays),
      page: undefined,
      itemsPerPage:String(this.limit)
   };   
    
     this.clearSearchParams();
     return {
      dateStart : moment(this.dateStart).format('YYYY-MM-DD'),
      dateEnd: moment(this.dateEnd).format('YYYY-MM-DD'),
      isCompanyDeposit: '',
      isOnlinePay: EMPTY_STRING,
      depositAmount1: EMPTY_STRING,
      depositAmount2: EMPTY_STRING,
      depositTimes1: EMPTY_STRING,
      depositTimes2: EMPTY_STRING,
      commissionable1: EMPTY_STRING,
      commissionable2: EMPTY_STRING,
      payoff1: EMPTY_STRING,
      payoff2: EMPTY_STRING,
      wagersCount1: EMPTY_STRING,
      wagersCount2: EMPTY_STRING,
      diffDays: EMPTY_STRING,
       page: undefined,
      itemsPerPage:String(this.limit)
    };
  }/* getSearchParams */

  private clearSearchParams() {
    this.depositAmount1 = EMPTY_STRING;
    this.depositAmount2 = EMPTY_STRING;
    this.depositTimes1 = EMPTY_STRING;
    this.depositTimes2 = EMPTY_STRING;
    this.commissionable1 = EMPTY_STRING;
    this.commissionable2 = EMPTY_STRING;
    this.payoff1 = EMPTY_STRING;
    this.payoff2 = EMPTY_STRING;
    this.wagersCount1 = EMPTY_STRING;
    this.wagersCount2 = EMPTY_STRING;
    this.diffDays = EMPTY_STRING;
    this.payments[1] = this.payments[2] = false;
  }
  private checkParam(param: any): string {
    return param === void 0 ? '' : String(param);
  }


  //控制 查詢/開始查詢按鈕是否顯示
  isSlideOpen: boolean = false;

  //觸發slide的按鈕字樣
  slideBtn: string = ' ▼ 进阶查询 ';

  queryDesktop: Element;
  toggleSlideBtn: HTMLButtonElement;

  ngOnInit() {
  
    /* bind jQuery */
    this.queryDesktop = document.querySelector('#queryPanel');
    this.toggleSlideBtn = document.querySelector('#toggleSlideBtn') as HTMLButtonElement;
    $(this.toggleSlideBtn).on('click', (e) => {
      this.toggleSlideBtn.blur();
      this.isSlideOpen = !this.isSlideOpen;
      if (!this.isSlideOpen) this.clearSearchParams();
      this.slideBtn = this.isSlideOpen ? '▲ 关闭选单' : '▼ 进阶查询';
      $(this.queryDesktop).slideToggle("slow");
    });

    //this.onPage({offset:this.offset , limit: this.limit});
    this.registerRouteSubscriber();
  }

  private registerRouteSubscriber(){
    this.routeSubscription = this.route.params.subscribe(params=>{
        let memberType = params['memberType'],isPaging = false;
            this.dateStart = this.util.getMeiDonBeforeYesterday.start.value;
            this.dateEnd = this.util.meidon.NOW;
            if(memberType && memberType.includes('d'))
            {
              this.depositTimes1 = 1;
            }         
         this.onPage({offset:this.offset , limit: this.limit});
    });
  }

  ngOnDestroy(): void {
    //this.accordinSubscription.unsubscribe();
    this.queryDesktop = void 0;
    this.toggleSlideBtn = void 0;
    this.routeSubscription.unsubscribe();
  }

}
