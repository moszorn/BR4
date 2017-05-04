import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { StaticService } from '../../../shared/services/static.service';

import { DecimalPipe } from '@angular/common';

import { UtilService } from '../../../shared/services/util.service';

import * as _ from 'lodash';

@Injectable()
export class MemberSrvService extends StaticService {

  queryUrl;

  constructor(private _injector: Injector, private decimalPipe:DecimalPipe) {
    
    super(_injector); 
       const byDay = this.util.meiDonYesterday.start.string,
      byWeek = this.util.meiDonLastWeek.start.string,
      byMonth = this.util.getMeiDonLastMonth.start.string;

    this.queryUrl =
      {
        MemberActiveDaily: 'api/MemberCard/MemberActive/D/' + byDay,/*日活跃会员数card1*/
        MemberActiveWeekly: 'api/MemberCard/MemberActive/W/' + byWeek,/*周活跃会员数card2*/
        MemberActiveMonthly: 'api/MemberCard/MemberActive/M/' + byMonth,/*月活跃会员数card3*/

        MemberRetentionRateDaily: 'api/MemberCard/MemberRr/D/' + byMonth,/*新会员日留存率card4*/
        MemberRetentionRateWeekly: 'api/MemberCard/MemberRr/W/' + byWeek,/*新会员周留存率card5*/
        MemberRetentionRateMonthly: 'api/MemberCard/MemberRr/M/' + byDay,/*新会员月留存率card6*/


        MemberChurnRateDaily: 'api/MemberCard/MemberCr/D/' + byDay,/*会员日留失率card7*/
        MemberChurnRateWeekly: 'api/MemberCard/MemberCr/W/' + byWeek,/*会员周留失率card8*/
        MemberChurnRateMonthly: 'api/MemberCard/MemberCr/M/' + byMonth,/*会员月流失率card9*/

        AverageRevenuePerUser: 'api/MemberCard/MemberArpu/' + byDay,/*活跃会员平均贡献card10*/
        LifeTimeOfUsers: 'api/MemberCard/MemberLtu/' + byDay,/*平均生命周期card11*/
        LifeTimeValue: 'api/MemberCard/LifeTimeValue/' + byDay,/*客户终身价值card12*/
        StickyFactor: 'api/MemberCard/StickyFactor/' + byDay,/*会员黏着度card13*/




        MemberDepActiveDaily: '/api/MemberDepCard/MemberActive/D/' + byDay, /*日活跃存款会员数 card1*/
        MemberDepActiveWeekly: '/api/MemberDepCard/MemberActive/W/' + byWeek, /*周活跃存款会员数 card2*/
        MemberDepActiveMonthly: '/api/MemberDepCard/MemberActive/M/' + byMonth, /*月活跃存款会员数 card3*/
        MemberDepRetentionRateDaily: 'api/MemberDepCard/MemberRr/D/' + byDay, /* 新会员 1 日留存率 card4*/
        MemberDepRetentionRateWeekly: 'api/MemberDepCard/MemberRr/W/' + byWeek, /* 新会员 7 日留存率 card5*/
        MemberDepRetentionRateMonthly: 'api/MemberDepCard/MemberRr/M/' + byMonth, /* 新会员 30 日留存率 card6*/
        MemberDepChurnRateDaily: 'api/MemberDepCard/MemberCr/D/' + byDay, /* 会员日流失率 card7*/
        MemberDepChurnRateWeekly: 'api/MemberDepCard/MemberCr/W/' + byWeek, /* 会员週流失率 card8*/
        MemberDepChurnRateMonthly: 'api/MemberDepCard/MemberCr/M/' + byMonth, /* 会员月流失率 card9*/
        DepAverageRevenuePerUser: 'api/MemberDepCard/MemberArpu/' + byDay, /* 存款会员平均贡献 - card10 */
        DepLifeTimeOfUsers: 'api/MemberDepCard/MemberLtu/' + byDay, /* 客户平均生命周期- card11*/
        DepLifeTimeValue: 'api/MemberDepCard/LifeTimeValue/' + byDay, /* 客戶终身价值- card12*/
        DepStickyFactor: 'api/MemberDepCard/StickyFactor/' + byDay, /* 会员黏著度 card13*/


        MemberDepMember: 'api/MemberDepCard/Member/' + byDay, /* 存款会员数 - 有效存款会员数 card14*/
        MemberDepNewMember: 'api/MemberDepCard/NewMember/' + byDay /* 新增存款会员数 card15*/
      };
  }


  //private Get(queryUrl){return this.http.get(this.baseUrl+queryUrl).toPromise().then(response => response.json());} 
  /*新進會員 */
  getcard1(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberActiveDaily, TEMPLATE, this.responseDataToCard); }
  getcard2(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberActiveWeekly, TEMPLATE, this.responseDataToCard); }
  getcard3(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberActiveMonthly, TEMPLATE, this.responseDataToCard); }
  getcard4(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberRetentionRateDaily, TEMPLATE, this.responseDataToCard); }
  getcard5(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberRetentionRateWeekly, TEMPLATE, this.responseDataToCard); }
  getcard6(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberRetentionRateMonthly, TEMPLATE, this.responseDataToCard); }
  getcard7(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberChurnRateDaily, TEMPLATE, this.responseDataToCard); }
  getcard8(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberChurnRateWeekly, TEMPLATE, this.responseDataToCard); }
  getcard9(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberChurnRateMonthly, TEMPLATE, this.responseDataToCard); }
  getcard10(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.AverageRevenuePerUser, TEMPLATE, this.responseDataToCard); }
  getcard11(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.LifeTimeOfUsers, TEMPLATE, this.responseDataToCard); }
  getcard12(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.LifeTimeValue, TEMPLATE, this.responseDataToCard); }
  getcard13(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.StickyFactor, TEMPLATE, this.responseDataToCard); }

  /**
   * 存款會員
   */
  getcard1d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepActiveDaily, TEMPLATE, this.responseDataToCard); }
  getcard2d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepActiveWeekly, TEMPLATE, this.responseDataToCard); }
  getcard3d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepActiveMonthly, TEMPLATE, this.responseDataToCard); }
  getcard4d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepRetentionRateDaily, TEMPLATE, this.responseDataToCard); }
  getcard5d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepRetentionRateWeekly, TEMPLATE, this.responseDataToCard); }
  getcard6d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepRetentionRateMonthly, TEMPLATE, this.responseDataToCard); }
  getcard7d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepChurnRateDaily, TEMPLATE, this.responseDataToCard); }
  getcard8d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepChurnRateWeekly, TEMPLATE, this.responseDataToCard); }
  getcard9d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepChurnRateMonthly, TEMPLATE, this.responseDataToCard); }
  getcard10d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.DepAverageRevenuePerUser, TEMPLATE, this.responseDataToCard); }
  getcard11d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.DepLifeTimeOfUsers, TEMPLATE, this.responseDataToCard); }
  getcard12d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.DepLifeTimeValue, TEMPLATE, this.responseDataToCard); }
  getcard13d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.DepStickyFactor, TEMPLATE, this.responseDataToCard); }
  getcard14d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepMember, TEMPLATE, this.responseDataToCard); }
  getcard15d(TEMPLATE: any): Promise<[any]> { return this.httpGet(this.queryUrl.MemberDepNewMember, TEMPLATE, this.responseDataToCard); }




  private responseDataToCard(card: any, TEMPLATE, util: UtilService) {
    switch (card.name) {
      case 'MemberActiveDaily':/*日活跃会员数*/
      case 'MemberActiveWeekly':/*周活跃会员数*/
      case 'MemberActiveMonthly':/*月活跃会员数*/
      case 'MemberDepActiveDaily':/* 日活跃存款会员数*/
      case 'MemberDepActiveWeekly':/* 周活跃存款会员数*/
      case 'MemberDepActiveMonthly':/* 月活跃存款会员数*/
      case 'MemberDepMember':/* 存款会员数 - 有效存款会员数*/
      case 'MemberDepNewMember':/* 新增存款会员数*/
        card.span = TEMPLATE.MEMBER_SPAN.replace(/%\w+%/g, card.value);
        break;

      case 'MemberRetentionRateMonthly':/*会员月留存率*/
      case 'MemberRetentionRateWeekly':/*会员周留存率*/
      case 'MemberRetentionRateDaily':/*会员日留存率*/
      case 'StickyFactor':/*会员黏着度*/
      case 'MemberChurnRateDaily':/*会员日留失率*/
      case 'MemberChurnRateWeekly':/*会员周留失率*/
      case 'MemberChurnRateMonthly':/*会员月流失率*/
      case 'MemberDepChurnRateDaily':/* 存款会员日流失率*/
      case 'MemberDepChurnRateWeekly':/* 存款会员週流失率*/
      case 'MemberDepChurnRateMonthly':/* 存款会员月流失率**/
      case 'MemberDepStickyFactor':/* 存款会员会员黏着度*/
      case 'MemberDepRetentionRateDaily':/* 存款会员日留存率*/
      case 'MemberDepRetentionRateWeekly':/* 存款会员周留存率*/
      case 'MemberDepRetentionRateMonthly':/* 存款会员月留存率*/
        card.span = TEMPLATE.PERCENT_SPAN.replace(/%\w+%/g, card.value);
        break;

      case 'LifeTimeOfUsers':/*平均生命周期*/
      case 'MemberDepMemberLtu':/* 存款会员平均生命周期*/
        card.span = TEMPLATE.DAY_SPAN.replace(/%\w+%/g, util.decimalPipe(card.value,'1.0'));
        break;

      case 'MemberArpu':/*活跃会员平均贡献*/
      case 'MemberDepLifeTimeValue':/*客户终身价值*/
      case 'DepAverageRevenuePerUser':/* 存款会员平均贡献 - ARPU*/
      case 'DepLifeTimeValue':/* 客戶终身价值- LTV*/
      case 'LifeTimeValue':/*客户终身价值*/
        card.span = TEMPLATE.AMOUNT_SPAN.replace(/%\w+%/g, util.decimalPipe(card.value,'1.0'));
        break;
      default:
        //console.info('card.name:%s did not recognize');
        card.span = `<span style='color:red'>${card.name}</span>`;
    }
    card.tip = card.tooltip;
    card.trend = Math.abs(card.trend);//remove minus sing
    card.isFlipped = false;
    card.data = [];
    _.forEach(card.items, (item, i) => {
      var _date = util.handleDateString(item.date);
      if (_date.length === 3) card.data.push({ x: _date[1] + '/' + _date[2], y: item.value });
      else card.data.push({ x: _date[0] + '/' + _date[1], y: item.value });
    });
    return card;
  }


}
