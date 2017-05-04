import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { OverallService } from '../../shared/services/overall.service';
import { StaticService } from '../../shared/services/static.service';
import { ReportService } from './services/report.service';

import * as _ from 'lodash';




@Component({
  selector: 'app-rpresent',
  templateUrl: './rpresent.component.html',
  styleUrls: ['./rpresent.component.css']
})
/**
 * 報表呈現  
 */
export class RpresentComponent implements OnInit {

  tabularSubscription: Subscription;
  entries: Array<any[]>;
  cards: Array<Object[]>;

  column_head1 = '';

  isTabularQuery: boolean = true;

  icons = {
    NewMember: 'icon-newMember',
    FirstDepositMember: 'icon-newMember-Deposit',
    DepositMember: 'icon-deposit',
    CommissionableSums: 'icon-bet',
    PayoffSums: 'icon-profit',
    NetIncome: 'icon-income'
  };


  isTrendRising(trend: number) {
    return trend > 0;
  }

  getIconClass(cardName: string) {
    return this.icons[cardName];
  }

  constructor(private report: ReportService, private overall: OverallService, private route: ActivatedRoute) {

    this.report.getCardDataByDMY('D').subscribe(
      item => { console.log(item), this.cards = item; },
      err => { console.log(err); console.log('getCardDataByDMY Error') },
      () => console.log(' constructor yay'));
  }


  ngOnInit() {

    this.tabularSubscription = this.route.params.subscribe(params => {
      this.isTabularQuery = true;

      //this.overall.getPromiseTable(params['TDMY']).then(item => { this.entries = item});

      this.report.getTabularDataByDMY(params['TDMY']).subscribe(
        item => {
                   /* OBJECT中插入索引 */
          _.forEach(item, (m, i) => {
            m.index = i + 1;
          });

          this.isTabularQuery = false;
          this.entries = item;
          /*this.column_head1 = 'ABC';
          讓表頭隨條件變更 說明
          */
          switch (params['TDMY']) {
            case 'D':
              this.column_head1 = "日";
              break;
            case 'W':
              this.column_head1 = "週";
              break;
            case 'M':
              this.column_head1 = "月";
              break;
            default:
              this.column_head1 = "沒有符合的條件";
          }
        },
        err => { console.log(err); console.log('getTabularDataByDMY Error') },
        () => console.log(' ngOnInit yay'));
    });
  }
  query_Day_Week_Month($event) {

    $('.tab a').removeClass('active');
    $event.target.className = 'active';
  }
  ngOnDestroy(): void {
    this.tabularSubscription.unsubscribe();
  }


  growthRate(today: number, yesterday: number): number {
    if (0 === yesterday) yesterday = 1;
    return (((today / yesterday) * 100) - 100);
  }



}
