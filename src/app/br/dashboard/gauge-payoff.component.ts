import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'gauge-payoff',
  template: `<app-gauge-chart [data]='data'></app-gauge-chart>`,
  styles: []
})
export class GaugePayOffComponent implements OnInit, OnDestroy {

 
  subscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  data: any[]
  ngOnInit() { 
    this.subscription = this.route.queryParams    
          .subscribe(o=>{
              this.data =  [{ name: '前期', value: o.payoffSumsPre }, { name: '當期', value: o.payoffSumsCur }];
          });
 }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
