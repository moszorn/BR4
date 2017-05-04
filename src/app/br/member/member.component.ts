import { Component, OnInit, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { OverallService } from '../../shared/services/overall.service';
import { StaticService } from '../../shared/services/static.service';
import { UtilService } from '../../shared/services/util.service';

import { MemberSrvService } from './services/member-srv.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
/**
 * 會員概況
 */
export class MemberComponent implements OnInit {
  isClickActiveMember: boolean = true;
  cards: Array<Object[]>;//
  httpMethods = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12', 'card13', 'card14', 'card15'];
  icons =
  {
    MemberActiveDaily: 'icon-active',/*日活跃会员数*/
    MemberActiveWeekly: 'icon-active',/*周活跃会员数*/
    MemberActiveMonthly: 'icon-active',/*月活跃会员数*/
    StickyFactor: 'icon-stickiness',/*会员黏着度*/
    AverageRevenuePerUser: 'icon-activeContribution',/*活跃会员平均贡献*/
    LifeTimeOfUsers: 'icon-life',/*平均生命周期*/
    LifeTimeValue: 'icon-value',/*客户终身价值*/
    MemberRetentionRateMonthly: 'icon-newMember',/*新会员月留存率*/
    MemberRetentionRateWeekly: 'icon-newMember',/*新会员周留存率*/
    MemberRetentionRateDaily: 'icon-newMember',/*新会员日留存率*/
    MemberChurnRateDaily: 'icon-lost',/*会员日留失率*/
    MemberChurnRateWeekly: 'icon-lost',/*会员周留失率*/
    MemberChurnRateMonthly: 'icon-lost',/*会员月流失率*/
    MemberDepActiveDaily: 'icon-active',/*日活跃存款会员数 */
    MemberDepActiveWeekly: 'icon-active',/*周活跃存款会员数 */
    MemberDepActiveMonthly: 'icon-active',/*月活跃存款会员数 */
    DepStickyFactor: 'icon-stickiness',/* 存款会员会员黏著度 */
    DepAverageRevenuePerUser: 'icon-contribution',/*存款会员平均贡献*/
    DepLifeTimeOfUsers: 'icon-life',/**客户平均生命周期- LTU */
    DepLifeTimeValue: 'icon-value', /**客戶终身价值- LTV */
    MemberDepRetentionRateDaily: 'icon-newMember',/* 存款会员 1 日留存率*/
    MemberDepRetentionRateWeekly: 'icon-newMember',/* 存款会员 7 日留存率*/
    MemberDepRetentionRateMonthly: 'icon-newMember',/* 存款会员 30 日留存率*/
    MemberDepChurnRateDaily: 'icon-lossofDeposit',/*存款会员日流失率*/
    MemberDepChurnRateWeekly: 'icon-lossofDeposit',/*会员週流失率*/
    MemberDepChurnRateMonthly: 'icon-lossofDeposit',/*存款会员月流失率*/
    MemberDepNewMember: 'icon-newMember-Deposit',/*新增存款会员数*/
    MemberDepMember: 'icon-addDeposit',/*存款会员数  */
  };


  //template %P% will be replace with meanful data  `%d%<span>人<span>`.replace(/%\w+%/g,32)
  htmlTEMPLATE = {
    /* TEMPLATE_SPAN */
    MEMBER_SPAN: `%P%<span> 人</span>`,
    AMOUNT_SPAN: `<span>¥</span> %P%`,
    PERCENT_SPAN: `%P%<span> %</span>`,
    DAY_SPAN: `%P%<span> 日</span>`
  };

  constructor(private db: MemberSrvService, private util: UtilService) { }

  ngOnInit() {
    //card initialized  
    _.forEach(this.httpMethods, (card, i) => {
      this[card] = {};
      this[card]['isQuery'] = true;
      this[card]['isLoadFail'] = false;
      this[card]['isHidden'] = true;
    });
    this.updateCards();
  }/* ngInit */

 cardHidden: boolean = true;
 hiddenCardWhenActiveMember(hidden:boolean){
    this.cardHidden = hidden;
 }

  updateCards(d = '') {

    this.hiddenCardWhenActiveMember(d.length === 0);

    _.forEach(this.httpMethods, (card, i) => {

      this[card]['isQuery'] = true;

      //新進會員沒有 card14,card15 所以跳掉
      if (i >= 13 && d.length == 0) {
        // this[card] = void 0;
        this[card]['isHidden'] = true;
        // this[card]['isLoadFail'] = true;
        this[card]['isQuery'] = false;
        return;
      }

      var queryMethod = "get" + card;

      //query dsposit member
      if (d.length > 0) queryMethod += d;

      this.db[queryMethod](this.htmlTEMPLATE)
        .then(result => {

          //console.log('response %s result =>d %o',queryMethod ,  result);

          if (undefined === result) {
            this[card]['isLoadFail'] = true;
            this[card]['isQuery'] = false;
            return;
          }

          this[card] = result;
          this[card].options = {

            chart: {
              type: 'sparklinePlus',
              height: 70,
              x: function (d, i) {
                return i;
              },
              duration: 0,
              xTickFormat: (d) => this[card].data[d].x,
              showMinMaxPoints: false,
              showCurrentPoint: false,
              margin: {
                top: 10,
                right: 0,
                bottom: 5,
                left: 0
              }
            }
          };//options
          this[card]['isQuery'] = false;
          return [
            {
              color: '#ff7f0e'
            }];
        });//db
    });//forEach
  }//updateCards


  isTrendRising(trend: number, who: string = '') {
    return trend > 0;
  }
  getIconClass(cardName: string) { return this.icons[cardName]; }
}
