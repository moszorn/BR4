import { Component, OnInit , OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment'; moment.locale('zh-cn');
import { UtilService } from '../../shared/services/util.service';
import { finItem, queryObject, finObject } from '../../shared/models/tdmy.model';
import { GameChartsService } from './services/game-charts.service';

const LINE_CHART_DATA_POINT = '7', CHART_KINDS = ['payoffSums', 'commissionableSums', 'wagersCounts', 'bite', 'memberCounts'];

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit , OnDestroy {

  
  subscription: Subscription;
  routeSubscription: Subscription;

  /** Line Chart Data declaration */
  payoffSumsLineData: any[];
  commissionableSumsLineData: any[];
  wagersCountsLineData: any[];
  biteLineData: any[];
  memberCountsLineData: any[];

  /* Bar Chart */
  payoffSums10Bar: any[];

  /*Pie */
  commissionableSumsPieData: any[];
  wagersCountsPieData: any[];
  bitePieData: any[];
  memberCountsPieData: any[];



  constructor(private route:ActivatedRoute , private chartSrv: GameChartsService, private util: UtilService) {
    //Line chart set init
    const payoffSumsLineData = [], commissionableSumsLineData = [], wagersCountsLineData = [], biteLineData = [], memberCountsLineData = [];
    Object.assign(this, { payoffSumsLineData }); Object.assign(this, { commissionableSumsLineData }); Object.assign(this, { wagersCountsLineData }); Object.assign(this, { biteLineData }); Object.assign(this, { memberCountsLineData });

    //損益 bar chart
    const payoffSums10Bar = []; Object.assign(this, { payoffSums10Bar });

    //Pie chart
    const commissionableSumsPieData = [], wagersCountsPieData = [], bitePieData = [], memberCountsPieData = [];
    Object.assign(this, { commissionableSumsPieData }); Object.assign(this, { wagersCountsPieData }); Object.assign(this, { bitePieData }); Object.assign(this, { memberCountsPieData });

  }

 /* 這是一個網頁定位的workaroung ,由Dashboard頁面帶著 #xxx 導向過來*/
 ngAfterViewChecked() {
    this.routeSubscription = this.route.fragment
      .subscribe(fragment => {
        if (fragment) {
          let element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView();
          }
        }
      });
  }

  ngOnInit() { 
    this.initLineChart();
    this.initDountBarChart();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }



   
  initLineChart() {
    let queryParam = { dateEnd: this.util.meiDonYesterday.end.string, queryType: 'D' };
    for (let kind of CHART_KINDS) {
      //設定每個 chart的loading
      this[kind + 'LineDataIsInQuery'] = true;
      //進行查詢
      this.queryLineData(queryParam, kind);
    }
  } 

/*********************************************************************************************** */
  queryLineByDay_Week_Month($event) {
    //$('.tab a').removeClass('active');$event.target.className = 'active';
    let target = $event.target,
      kind = $event.target.attributes['data-kind'].value,
      searchBy = $event.target.attributes['data-searchBy'].value,
      targetpos = $event.target.attributes['Cwhat'].value,
      queryParam = { dateEnd: this.chartSrv.getDateStringByDWM(searchBy), queryType: searchBy };
    this.queryLineData(queryParam, kind);
    /* 日期選項 顯示控制 */
    this[kind + 'LineDataIsInQuery'] = true;
    /*console.log('targetop=> ' + '.' + targetpos + ' .tab a');*/
    //console.log('pick',targetpos);
    this.Uitimepick = { target: target, targetpos: targetpos };
  }
 
  set Uitimepick(pick_time) {
    $('.' + pick_time.targetpos + ' .tab a').removeClass('active');
    pick_time.target.className = 'active';
  }
  
  queryLineData(queryParam: queryObject, kind: string) {
    queryParam.dataCount = LINE_CHART_DATA_POINT;
    this.chartSrv.getFiveLineChartData(queryParam)
      .then((lineDatas) => {
        if (lineDatas) {
          if (lineDatas[kind] && lineDatas[kind][0] && lineDatas[kind][0].series.length > 0) {
            this[kind + 'LineData'] = lineDatas[kind];
          }
        }
        this[kind + 'LineDataIsInQuery'] = false;
      });
  }/*queryLineData*/

/************************************************************************************************************** */

  initDountBarChart(){
    //預設查詢條件
    let queryDate = this.util.meiDonYesterday.end.string, queryType = this.chartSrv.category_parameter;

    this.queryDonutChartBarChatData(queryDate,queryType);
  }
 
  queryDonutChartBarChatData(queryDate:string, queryType:number){  
    this.subscription = this.chartSrv.getDonutChartBarChatData(queryDate,queryType)
       .subscribe(datas =>{    
       //損益
       this.payoffSums10Bar = datas.payoffSums;
       //有效投注
       this.commissionableSumsPieData = datas.commissionableSums;
       //投注單量
       this.wagersCountsPieData = datas.wagersCounts;
       //營收比
       this.bitePieData = datas.bite;
       //有效投注會員
       this.memberCountsPieData = datas.memberCounts;
       // Object.assign(this, { payoffSums10Bar });
     }); 
  }


  //UI控制是否按下,active class
  //第一個元素:種類被按下時
  //第二個元素:娛樂城被按下時
  //第三個元素:娛樂廳被按下時
  cathallClicks = [true, false, false];// Category Hall Clicks
  queryPieBarBy($event) {
    let target = $event.target,
      kind = target.attributes['data-kind'].value /*value should be catalog, halls, hall*/,
      queryType = this.convertToQueryType(kind),
      queryDate = moment(this.util.meiDonYesterday.start.value).format('YYYY-MM-DD');
      this.queryDonutChartBarChatData(queryDate, queryType);
  }

  private convertToQueryType(uiSelect:string){   
    //預設以種類(catalog)查詢
    let queryBy = this.chartSrv.category_parameter;
    switch(uiSelect){     
      case 'halls': queryBy = this.chartSrv.gameHalls_parameter;break;
      case 'hall': queryBy = this.chartSrv.gameHall_parameter;break;
    }
    return queryBy;
  }

  /* UI 長條圖滑過效果 */
  tenBarFocus_r: any;
  tenBarActive($event) {
    /*console.log('tenBarActive: %o', $event.value.name);*/
    this.tenBarFocus_r = [
      {
        name: $event.value.name,
        /*value: '#5BADCC' */
        value: '#9FDFFF'
      }
    ];
  }

}
