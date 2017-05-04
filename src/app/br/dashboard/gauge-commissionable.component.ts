import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'gauge-commissionable',
  template: `<app-gauge-chart [data]='data'></app-gauge-chart>`,
  styles: []
})
export class GaugeCommissionableComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(private route: ActivatedRoute) { }

  data: any[]
  ngOnInit() { 
    this.subscription = this.route.queryParams    
          .subscribe(o=>{
              this.data =  [{ name: '前期', value: o.commissionablePre }, { name: '當期', value: o.commissionableCur }];
          });
 }

   ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
