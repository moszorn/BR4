import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { StaticService } from '../../../shared/services/static.service';

import { finItem, queryObject, finObject } from '../../../shared/models/tdmy.model';


@Injectable()
export class DashboardService extends StaticService {

  constructor(private _injector: Injector, private http: Http) { super(_injector); }

  //http://br-api.losade.info/api/Graphic/GameCategoryTable-v1/D/2017-03-01/2017-03-09
  getTabular(DWM: string, startDate: string, dateEnd: string): Observable<Array<finItem>> {
    var t = this.util.getMeiDonBeforeYesterday;
    const url = `api/Graphic/GameCategoryTable-v1/${DWM}/${startDate}/${dateEnd}`;
    return this.httpGetObserverable(url);
  }

  async getTenBarData(queryObj: queryObject): Promise<any> {
    const the_CONST = 100000;//預除十萬
    const toMillion = (item)=> {
        return item.value = item.value/the_CONST;
      },   
      barChartParams: URLSearchParams = this.get10BarChartURLSearchParams(queryObj),
      barUrl = `api/Graphic/BarChart`, bar10 = {},
      chartData2 = await this.tenBarData(barUrl, barChartParams);

      _.forEach(chartData2.payoffSums.result , (item,i)=>{
          toMillion(item);
      });
       _.forEach(chartData2.commissionableSums.result , (item,i)=>{
          toMillion(item);
      });
       _.forEach( chartData2.wagersCounts.result , (item,i)=>{
          toMillion(item);
      });

    bar10['payoffSums'] = chartData2.payoffSums.result;
    bar10['commissionableSums'] = chartData2.commissionableSums.result;
    bar10['wagersCounts'] = chartData2.wagersCounts.result;

    return bar10;
  }

  async getChartData(queryObj: queryObject): Promise<any> {

    const gauageParams: URLSearchParams = this.getGauageURLSearchParams(queryObj),
      trendMemberChartParams: URLSearchParams = this.getTrendMemberChartURLSearchParams(queryObj),
      aguageUrl = `api/Graphic/GaugeAndBite`,
      trendMemberUrl = `api/Graphic/BrTrendAllMembers`;

    //Gauage & 营收比
    // let gauge: any;
    // let bite:any;


    var chartData1 = await this.gaugeData(aguageUrl, gauageParams).catch(rej => { console.log('rej rej rej: %o', rej); });
    var chartData3 = await this.biteLineData(trendMemberUrl, trendMemberChartParams);

    const bite = (chartData1 === void 0) ? undefined : chartData1['bite'],
      gauge = (chartData1 === void 0) ? undefined : chartData1['gauge'],
      trendMember = (chartData3 === void 0) ? undefined : chartData3;

    return {
      bite, gauge, trendMember
    };
  }/*eof getChartData */


  private async gaugeData(url: string, params: URLSearchParams) {
    //  let tupleResult:[any,any];
    let result: any;
    //取得三個Cauge,和 bite
    await this.httpGet2(url, params).then(data => {

      if (data === undefined) return data;
      //console.log('get gauage response==> bites: %o', data);       
      let gauage: finObject = {
        payoffSums: data.gauges.payoffSums,
        commissionableSums: data.gauges.commissionableSums,
        wagersCounts: data.gauges.wagersCounts
      },
        /*咬度 */
        _bite = _.map(data.bites.items, (item: any, i: number) => {
          /*let _class = item.percentage > 0 ? "red" : "green";*/
          let _class = item.percentage > 0 ? "lblue" : "lblue";
          let span = `<span class='tcp_span ${_class}'>${item.percentage}</span>`;
          return { name: item.name + span, value: item.percentage }
        });
      result = {
        gauge: {
          payoffSums: data.gauges.payoffSums,
          commissionableSums: data.gauges.commissionableSums,
          wagersCounts: data.gauges.wagersCounts
        },
        bite: _bite
      }
    }, rej => {
      console.log('[gaugeData] Reject: rej :%o', rej);
    });
    return result;
  }

  private async tenBarData(url: string, params: URLSearchParams) {
    let result: any;
    //取得 時日周月bar chart
    await this.httpGet2(url, params).then(data => {

      let commissionableSums = this.get10BarData(data.commissionableSums),
        payoffSums = this.get10BarData(data.payoffSums),
        wagersCounts = this.get10BarData(data.wagersCounts);
      result = {
        payoffSums, commissionableSums, wagersCounts
      };
    });//eof http

    return result;
  }

  private async biteLineData(url: string, params: URLSearchParams) {

    let result: any;
    //trendMembers
    await this.httpGet2(url, params).then((data: [any]) => {
      //console.log('TrendMember Response: %o', data);
      if (!data || data.length !== 2) return;
      //data[0]為當期 , data[1]為前期

      const _currentLabel = _.sumBy(data[0].series, (o: any) => o.value),
        _lastLabel = _.sumBy(data[1].series, (o: any) => o.value);

      //因為前期比當期資料多
      //例如前期月為一個月,當期只有15天,所以前期資料會是31筆,當期只會又15筆
      const xAxisName = [],
        prevItemsCount = data[1].series.length;

      _.forEach(data[1].series, (item, idx) => {
        xAxisName.push({ xAxis: item.name });
      });

      for (let idx = 0; idx < prevItemsCount; idx++) {
        let item = data[0].series[idx];
        if (item) {
          xAxisName[idx].xAxis = `${item.name} ` + xAxisName[idx].xAxis;
          data[0].series[idx].name = xAxisName[idx].xAxis;
        } else {
          data[0].series[idx] = { name: xAxisName[idx].xAxis, value: 0 };
        }
        data[1].series[idx].name = xAxisName[idx].xAxis;
      }

      result = {
        currentFrom: data[0].dateStart.split('T')[0],
        currentTo: data[0].dateEnd.split('T')[0],
        lastFrom: data[1].dateStart.split('T')[0],
        lastTo: data[1].dateEnd.split('T')[0],
        currentLabel: _currentLabel,
        lastLabel: _lastLabel,
        values: [
          {
            name: '當期',
            series: data[0].series,
          },
          {
            name: '前期',
            series: data[1].series
          }
        ]
      };
    });
    return result;
  }

  private get10BarData(datas) {
    let result = [];
    _.forEach(datas, (item: any, i: number) => {
      //result.push({ name: item.date.split('~')[0], value: item.value });
       result.push({ name: item.date, value: item.value });
    });
    return { result };
  }





  /**dateStart1=2017-03-01&dateEnd1=2017-03-02&dateStart2=2017-03-03&dateEnd2=2017-03-04 */
  private getGauageURLSearchParams(obj: queryObject): URLSearchParams {
    let p: URLSearchParams = new URLSearchParams();

    p.set('dateStart1', obj.end.dateStart);
    p.set('dateEnd1', obj.end.dateEnd);
    p.set('dateStart2', obj.start.dateStart);
    p.set('dateEnd2', obj.start.dateEnd);
    return p;
  }


/**dateEnd=2017-03-10&groupType=M */
private get10BarChartURLSearchParams(obj: queryObject): URLSearchParams {
    let p:URLSearchParams = new URLSearchParams();

    p.set('dateEnd', obj.dateEnd);
    p.set('groupType', obj.queryType);
    return p;
  }
  /*groupType=D&dateEnd1=2017-01-31&dateEnd2=2017-01-31 */
  private getTrendMemberChartURLSearchParams(obj: queryObject): URLSearchParams {
    let p: URLSearchParams = new URLSearchParams();
    p.set('dateEnd1', obj.end.dateEnd);
    p.set('dateEnd2', obj.start.dateEnd)
    p.set('groupType', obj.queryType);
    return p;
  }

}

/*
       const fewDayAgo = this.util.getFewDayAgoByFrom(9,new Date(2017,4,14));//取得指定日期起到指定日期前10日
      const tenDayAgo = this.util.getFewDayAgoToday(9); //取得10天前日期到今日
      const today = this.util.meiDonYesterday; //取得美東昨日
      const thisWeek = this.util.getMeiDonThisWeekToday; //取得美東本周
      const lastWeek = this.util.meiDonLastWeek; //取得美東上周
      const thisMonth = this.util.getMeiDonThisMonthToday;  //取得美東本月
      const lastMonth = this.util.getMeiDonLastMonthOnly;//取得今日算起30天前

*/
