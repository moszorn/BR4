import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { CurrencyPipe, DecimalPipe } from '@angular/common';

import * as _ from 'lodash';

import { DashboardService } from './services/dashboard.service';
import { GameSrhService } from '../game-search/services/game-srh.service';


import { UtilService } from '../../shared/services/util.service';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment'; moment.locale('zh-cn');


import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { ComponentDate } from '../../shared/models/componentDate';
import { finItem, queryObject, finObject } from '../../shared/models/tdmy.model';

import { GaugeChartComponent } from './gauge-chart.component';

import * as $ from 'jquery';
export enum DATER {
  yesterday = 10,
  thisWeek = 11,
  lastWeek = 12,
  thisMonth = 13,
  lastMonth = 14
};
const FIN_TEMPLATE: finObject = { payoffSums: undefined, commissionableSums: undefined, wagersCounts: undefined, bite: undefined, memberCounts: undefined, category: undefined, isRise: false };

//[yAxis]="showYAxis"
@Component({
  selector: 'bi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CurrencyPipe, DecimalPipe]
})

export class DashboardComponent implements OnInit, OnDestroy {
  //用於 Bar tool tip
  BarTip = {};
  gaugeFliper = {
    flip1: false,
    flip2: false,
    flip3: false
  }
  /* 自訂 bar tooltips 顯示設定 */
  showEDxtooltip() {
    $('.profitPanel .edx-tooltip-content').css('opacity', 1);
    $('.effectivePanel .edx-tooltip-content').css('opacity', 1);
    $('.betPanel .edx-tooltip-content').css('opacity', 1);
  }
  unshowEDxtooltip() {
     $('.profitPanel .edx-tooltip-content').remove();
      $('.effectivePanel .edx-tooltip-content').remove();
      $('.betPanel .edx-tooltip-content').remove();
  }
  //查詢日期
  public dateStart: Date = this.util.meidon.NOW;
  public dateEnd: Date = this.util.meidon.NOW;
  //查詢比較日期
  private compareDateStart: Date = this.util.meidon.YESTERDAY;
  private compareDateEnd: Date = this.util.meidon.YESTERDAY;

  //Date Ranger select handler
  dateRangSelect($event) {
    this.unshowEDxtooltip();
    this.Select_DMY_type = false;
    this.compareDateStart = $event.endFrom;
    this.compareDateEnd = $event.endTo;
    this.dateStart = $event.startFrom;
    this.dateEnd = $event.startTo;
  }

  Select_DMY_type: boolean = true;

  currentQueryDater: DATER;
  entries: Array<finItem>;

  body: any;

  /*gauge = 半圓圖 */
  gauge: finObject = Object.assign({}, FIN_TEMPLATE);
  /* 營收比 咬度BAR */
  biteBar: any[];
  /* 營收比 咬度BAR_的X軸 LABEL */
  biteChartxAxis: string[];
  /* 有效投注會員BAR */
  trendMemberxAxis: string[];

  /** 十條bar */
  payoffSums10: any[];
  commissionableSums10: any[];
  wagersCounts10: any[];



  /* 遊戲占比tabular 合計row */
  payoffSumsTotal: number;
  commissionableSumsTotal: number;
  biteTotal: number;
  wagersCountsTotal: number;
  memberCountsTotal: number;

  /**TrendMember */
  trendMembersLines: any[];
  trendMembers: any;
  trendMemberxAxisLabelStart: string;
  trendMemberxAxisLabelEnd: string;

  /** Date ranger picker  */
  //區間日期選擇器

  ngOnInit() {
    this.currentQueryDater = DATER.yesterday;
    this.query();
  }
  ngOnDestroy() {
    this.body.style.backgroundColor = '#fff';
    this.body = undefined;
  }
  /**設定時日週月查詢參數 
  */

  queryTenBarByTime_Day_Week_Month($event) {
    let target = $event.target,
      wording = target.attributes['data-byWording'].value,
      kind = target.attributes['data-kind'].value,
      groupBy = target.attributes['data-groupBy'].value,
      targetpos = target.attributes['Cwhat'].value,
      queryParam = { dateEnd: moment(this.dateEnd).format('YYYY-MM-DD'), queryType: groupBy };

    this.querytenBar(queryParam, kind);
    this.Uitimepick = { target: $event.target, kind: kind, wording: wording, targetpos: targetpos };
  }

  set Uitimepick(edward) {
    if (edward.targetpos == 'A') {
      $('.profitPanel .tab a').removeClass('active');
      $('.profitPanel .edx-tooltip-content').css('display', 'none');
    }
    if (edward.targetpos == 'B') {
      $('.effectivePanel .tab a').removeClass('active');
      $('.effectivePanel .edx-tooltip-content').css('display', 'none');
    }
    if (edward.targetpos == 'C') {
      $('.betPanel .tab a').removeClass('active');
      $('.betPanel .edx-tooltip-content').css('display', 'none');
    }
    edward.target.className = 'active';
    $(`#${edward.kind}BarLabel`).text(edward.wording);

  }

  querytenBar(queryParam: queryObject, kind: string) {

    this.dashSrv.getTenBarData(queryParam).then(obj => {
      if (obj) {
        let dataObj = obj[kind];
        if (dataObj && dataObj.length > 0) {
          switch (kind) {
            case 'payoffSums':
              let payoffSums10 = dataObj; Object.assign(this, { payoffSums10 });
              break;
            case 'commissionableSums':
              let commissionableSums10 = dataObj; Object.assign(this, { commissionableSums10 });
              break;
            case 'wagersCounts':
              let wagersCounts10 = dataObj; Object.assign(this, { wagersCounts10 });
              break;
          }
        }
      }
      else {
        this.clearTenBar();
      }
    });//then
  };//eof tenBarTime
  tenBarDay(type: string) { }
  tenBarWeek(type: string) { }
  tenBarMonth(type: string) { }

  query() {
    /*
        console.log(`query  moment(this.dateStart).format('YYYY-MM-DD'):  ${ moment(this.dateStart).format('YYYY-MM-DD')}
        moment(this.dateEnd).format('YYYY-MM-DD') : ${moment(this.dateEnd).format('YYYY-MM-DD')}
        `); */
    let queryDate = this.Select_DMY_type ? this.queryDateType : 'D',

      start1 = moment(this.compareDateStart).format('YYYY-MM-DD'),
      end1 = moment(this.compareDateEnd).format('YYYY-MM-DD'),
      start2 = moment(this.dateStart).format('YYYY-MM-DD'),
      end2 = moment(this.dateEnd).format('YYYY-MM-DD'),

      queryParms = {
        start: {
          dateStart: start1,
          dateEnd: end1
        },
        end: {
          dateStart: start2,
          dateEnd: end2
        },
        dateStart: undefined,
        dateEnd: end2,
        queryType: queryDate
      };

    this.dashSrv.getTabular(queryDate, this.uiFrom, this.uiTo)
      .subscribe(finItems => {
        let total = finItems.pop();
        this.payoffSumsTotal = total.payoffSums;
        this.commissionableSumsTotal = total.commissionableSums;
        this.biteTotal = total.bite;
        this.wagersCountsTotal = total.wagersCounts;
        this.memberCountsTotal = total.memberCounts;
        this.entries = _.sortBy(finItems, ['payoffSums']);
      });

    this.dashSrv.getTenBarData(queryParms).then(obj => {
      if (obj) {
        if (obj.payoffSums && obj.payoffSums.length > 0) {
          let payoffSums10 = obj.payoffSums;
          Object.assign(this, { payoffSums10 }); 
          const last =  obj.payoffSums[obj.payoffSums.length - 1];
          this.BarTip['payoffSums'] = {date: last.name ,value: this.util.decimalPipe(last.value,"1.2")};         
        }
        if (obj.commissionableSums && obj.commissionableSums.length > 0) {
          let commissionableSums10 = obj.commissionableSums;
          Object.assign(this, { commissionableSums10 });
           const last =  obj.payoffSums[obj.commissionableSums.length - 1];
          this.BarTip['commissionableSums'] = {date: last.name ,value: this.util.decimalPipe(last.value,"1.2")};    
        }
        if (obj.wagersCounts && obj.wagersCounts.length > 0) {
          let wagersCounts10 = obj.wagersCounts;
          Object.assign(this, { wagersCounts10 });
           const last =  obj.payoffSums[obj.wagersCounts.length - 1];
          this.BarTip['wagersCounts'] = {date: last.name ,value: this.util.decimalPipe(last.value,"1.2")};    
        }
       
        /* 自訂TOOLTIPS 設定讀取完1秒 顯示*/
        window.setTimeout(() => this.showEDxtooltip(), 1000);
      }
      else {
        this.clearTenBar();
      }

    });

    this.dashSrv.getChartData(queryParms).then(obj => {
      this.gauge = Object.assign({}, FIN_TEMPLATE);
      if (obj) {

        if (obj.gauge) {

          this.gaugePayOff = [];
          this.gaugeCommission = [];
          this.gaugeWagerCount = [];

          this.gauge.payoffSums = obj.gauge.payoffSums;
          this.gauge.payoffSums.isRise = this.gauge.payoffSums.percentage > 0;
          this.gauge.commissionableSums = obj.gauge.commissionableSums;
          this.gauge.commissionableSums.isRise = this.gauge.commissionableSums.percentage > 0;
          this.gauge.wagersCounts = obj.gauge.wagersCounts;
          this.gauge.wagersCounts.isRise = this.gauge.wagersCounts.percentage > 0;

          this.gaugePayOff = [{ name: '前期', value: this.gauge.payoffSums.before }, { name: '當期', value: this.gauge.payoffSums.current }];
          this.gaugeCommission = [{ name: '前期', value: this.gauge.commissionableSums.before }, { name: '當期', value: this.gauge.commissionableSums.current }];
          this.gaugeWagerCount = [{ name: '前期', value: this.gauge.wagersCounts.before }, { name: '當期', value: this.gauge.wagersCounts.current }];

          let navigationExtras = {
            queryParams: {
              payoffSumsCur: this.gauge.payoffSums.current, payoffSumsPre: this.gauge.payoffSums.before,
              wagersCountCur: this.gauge.wagersCounts.current, wagersCountPre: this.gauge.wagersCounts.before,
              commissionableCur: this.gauge.commissionableSums.current, commissionablePre: this.gauge.commissionableSums.before
            }
          };
          this.router.navigate([`/Dashboard`,
            {
              outlets: {
                payoff: [`payoff${queryDate}`],
                wagers: [`wagers${queryDate}`],
                commissionable: [`commissionable${queryDate}`]
              }
            }
          ],
            navigationExtras);

        } else {
          this.clearCauge();
        }

        if (obj.bite) {
          var biteBar = [
            { name: 'pollify1', value: 0 },
            { name: '彩票', value: obj.bite[0].value },
            { name: 'pollify2', value: 0 },
            { name: '体育', value: obj.bite[1].value },
            { name: 'pollify3', value: 0 },
            { name: '视讯', value: obj.bite[2].value },
            { name: 'pollify4', value: 0 },
            { name: '机率', value: obj.bite[3].value },
            { name: 'pollify5', value: 0 },
            { name: '全部', value: obj.bite[4].value }
          ];
          Object.assign(this, { biteBar });

          var biteChartxAxis = [];
          _.forEach(obj.bite, function (item, i) {
            biteChartxAxis[i] = item.name;
          });
          this.biteChartxAxis = biteChartxAxis;
        }
        else {
          this.clearBiteChart();
        }

        if (obj.trendMember) {
          this.trendMembers = obj.trendMember;
          const trendMembersLines = obj.trendMember.values;

          //trendMemberxAxis 底下x軸label暫時沒有到,但未來可能會用到
          var trendMemberxAxis = [];; trendMemberxAxis[0] = obj.trendMember.currentFrom; trendMemberxAxis[1] = obj.trendMember.values[0].series[3].name;; trendMemberxAxis[2] = obj.trendMember.values[0].series[7].name;; trendMemberxAxis[3] = obj.trendMember.currentTo; this.trendMemberxAxis = trendMemberxAxis;

          //設定 trend member X軸兩邊的wording
          this.trendMemberxAxisLabelStart = obj.trendMember.currentFrom;
          this.trendMemberxAxisLabelEnd = obj.trendMember.currentTo;


          //console.log('obj.trendMember : %o', obj.trendMember);
          //console.log('trendMemberxAxis : %o', trendMemberxAxis);
          Object.assign(this, { trendMembersLines });
        }
        else {
          this.clearTrendMember();
        }

      }
      else {
        //clearn all chart
        this.clearCauge();
        this.clearBiteChart();
        this.clearTrendMember();
        this.clearTenBar();
      }

    });//eof .getChartData

  }


  private clearCauge() {
    this.gaugePayOff = [{ name: '前期', value: 0 }, { name: '當期', value: 0 }];
    this.gaugeCommission = [{ name: '前期', value: 0 }, { name: '當期', value: 0 }];
    this.gaugeWagerCount = [{ name: '前期', value: 0 }, { name: '當期', value: 0 }];
  }
  private clearBiteChart() {
    var biteBar = [];
    Object.assign(this, { biteBar });
    this.biteChartxAxis = [
      "彩票<span class='tcp_span up'></span>",
      "體育<span class='tcp_span up'></span>",
      "視訊<span class='tcp_span up'></span>",
      "機率<span class='tcp_span up'></span>",
      "全部<span class='tcp_span up'></span>"
    ];
  }

  private clearTenBar() {
    let payoffSums10 = [], commissionableSums10 = [], wagersCounts10 = [];
    Object.assign(this, { payoffSums10 });
    Object.assign(this, { commissionableSums10 });
    Object.assign(this, { wagersCounts10 });
  }

  private clearTrendMember() {
    this.trendMembers = undefined;
    //trendMembers
    const trendMembersLines = [];
    const trendMemberxAxis = [];
    trendMemberxAxis[0] = '';
    trendMemberxAxis[1] = '';
    trendMemberxAxis[2] = '';
    trendMemberxAxis[3] = '';
    this.trendMemberxAxis = trendMemberxAxis;
    //console.log('obj.trendMember : %o', obj.trendMember);
    //console.log('trendMemberxAxis : %o', trendMemberxAxis);
    Object.assign(this, { trendMembersLines });
  }

  private trendMemberXAxisLabelTweak(toTweak: string) {
    if (!toTweak) return '';
    let _toWeak = toTweak.split('-')[0];
    return _toWeak
  }



  initValue() {
    this.dateStart = this.util.meiDonYesterday.start.value;
    this.dateEnd = this.util.meiDonYesterday.end.value;
    this.body = document.querySelector('BODY');
    this.body.style.backgroundColor = '#353535';
  }

  get uiFrom() {
    return moment(this.dateStart).format('YYYY-MM-DD');
  }
  get uiTo() {
    return moment(this.dateEnd).format('YYYY-MM-DD');
  }



  //查詢日期型態
  get queryDateType() {
    this.Select_DMY_type = true;
    let dmy = 'D';
    switch (this.currentQueryDater) {
      case DATER.yesterday:
        this.compareDateStart = this.util.getMeiDonBeforeYesterday.start.value;
        this.compareDateEnd = this.util.getMeiDonBeforeYesterday.end.value;
        dmy = 'D'; break;

      case DATER.thisWeek:
        this.compareDateStart = this.util.meiDonLastWeek.start.value;//上週
        this.compareDateEnd = this.util.meiDonLastWeek.end.value;//上週
        dmy = 'W'; break;

      case DATER.lastWeek:
        this.compareDateStart = this.util.meiDonLast2Week.start.value;//上上週
        this.compareDateEnd = this.util.meiDonLast2Week.end.value;//上上週
        dmy = 'W'; break;

      case DATER.thisMonth:
        this.compareDateStart = this.util.getMeiDonLastMonthOnly.start.value;//上月
        this.compareDateEnd = this.util.getMeiDonLastMonthOnly.end.value;//上月
        dmy = 'M'; break;

      case DATER.lastMonth:
        this.compareDateStart = this.util.getMeiDonLast2MonthOnly.start.value;//上上月
        this.compareDateEnd = this.util.getMeiDonLast2MonthOnly.end.value;//上上月 
        dmy = 'M'; break;
    }
    //console.log(`queryDateType compare dateStart: %s , dateEnd: %s`,  moment(this.compareDateStart).format('YYYY-MM-DD'), moment(this.compareDateEnd).format('YYYY-MM-DD') );
    return dmy;
  }

  //update UI & set query Dater
  updateDatePicker(num) {
    //昨日 本周 上周 本月 上月
    this.currentQueryDater = num;
    switch (this.currentQueryDater) {
      case DATER.yesterday:
        this.dateStart = this.util.meiDonYesterday.start.value;
        this.dateEnd = this.util.meiDonYesterday.end.value;
        break;

      case DATER.thisWeek:
        this.dateStart = this.util.getMeiDonThisWeekToday.start.value;
        this.dateEnd = this.util.getMeiDonThisWeekToday.end.value;
        break;

      case DATER.lastWeek:
        this.dateStart = this.util.meiDonLastWeek.start.value;
        this.dateEnd = this.util.meiDonLastWeek.end.value;
        break;

      case DATER.thisMonth:
        this.dateStart = this.util.getMeiDonThisMonthToday.start.value;
        this.dateEnd = this.util.getMeiDonThisMonthToday.end.value;
        break;

      case DATER.lastMonth:
        this.dateStart = this.util.getMeiDonLastMonthOnly.start.value;
        this.dateEnd = this.util.getMeiDonLastMonthOnly.end.value;
        break;
    }
    this.unshowEDxtooltip();
    //console.log(`updateDatePicker dateStart: %s , dateEnd: %s`, moment(this.dateStart).format('YYYY-MM-DD'),moment(this.dateEnd).format('YYYY-MM-DD'));
  }

  /* 上方日期選項運作時 ，連帶控制三卡牌控制項 */
  header_timepick($event) {
    let target = $event.target,
      time_byWord = target.attributes['data-byWording'].value;
    $('.page-item button').removeClass('active');
    $('.show_tabtype span').text(time_byWord);
    $event.target.className = 'page-link active';
    this.day_week_month = target.attributes['data-dwm'].value;
  }
  /* 點選HEADER TIME時，下方同步處理 關鍵變數 */
  public show_DWM = 'DAY';

  set day_week_month(val) {
    if (this.show_DWM != val) { $('.tab a').removeClass('active'); }
    this.show_DWM = val;
  }
  get day_week_month() {
    return this.show_DWM;
  }

  gaugePayOff: any[] = [];
  gaugeCommission: any[] = [];
  gaugeWagerCount: any[] = [];

  //底下建構式中的 GameSrhService是預先撈取資料並置入快取,方便後續使用
  constructor(private gameSrv: GameSrhService ,private router: Router, private decimalPipe: DecimalPipe, private daterangepickerOptions: DaterangepickerConfig, private dashSrv: DashboardService, private util: UtilService) {

    //設定DateRangerPicker版面上的位置
    //this.daterangepickerOptions.settings = ComponentDate.rangerPickerOptions;
    //this.daterangepickerOptions.settings.parentEl = '.dashboardContent';   

    var payoffSums10 = [], commissionableSums10 = [], wagersCounts10 = [], biteBar = [], trendMembersLines = [];
    Object.assign(this, { payoffSums10 });
    Object.assign(this, { commissionableSums10 });
    Object.assign(this, { wagersCounts10 });
    Object.assign(this, { biteBar });
    Object.assign(this, { trendMembersLines });
    this.initValue();
  }

  tenBarView: any[] = [280, 140];
  gaugeView: any[] = [280, 240];
  biteView: any = [420, 200];
  /*trendMembView: any = [420, 400];*/

  /* bar-Vertical 滑過隱藏 自訂TOOLTIP*/
  tenBarFocus: any;
  tenBarFocus2: any;
  tenBarFocus3: any;


  tenBarActive($event) {
    $('.profitPanel .edx-tooltip-content').css('display', 'none');
  }
  tenBarActive2($event) {
    $('.effectivePanel .edx-tooltip-content').css('display', 'none');
  }
  tenBarActive3($event) {
    $('.betPanel .edx-tooltip-content').css('display', 'none');
    /*this.tenBarFocus3 = [
      {
        name: $event.value.name,
        value: '#9FDFFF'
      }
    ];*/
  }

  onLineChartPointClick(event) {
    this.trendMemberxAxisLabelStart = undefined;

    const value = this.decimalPipe.transform(event.value, '1.0'),
      _dates = event.name.split(' ');
    switch (event.series) {
      case '當期': this.trendMemberxAxisLabelStart = `${event.series} (${value}) ${_dates[1]}`; break;
      case '前期': this.trendMemberxAxisLabelStart = `${event.series} (${value}) ${_dates[0]}`; break;
    }
  }

  tenBarColorScheme = {
    domain: ['#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965', '#2a5965']
  };

  gaugeColorScheme = { domain: ['#44bbcc', '#A10A28'] };
  biteColorScheme = {
    domain: ['', 'orange', '', 'green', '', 'pink', '', 'yellow', '', '#44bbcc']
  };
  trendMemberColorScheme = {
    domain: ["#2980b9", "#c0392b"]
  };

  //"#2980b9","#c0392b"
  // options
  onSelect(event , pagePosition){
   this.router.navigate(['Game'], {fragment: `${pagePosition}`});
   // this.router.navigateByUrl(`Game?#${pagePosition}`);與上面那一行等效
  }

  /** Gauage goes here */
}
