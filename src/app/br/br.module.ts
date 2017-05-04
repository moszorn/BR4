import { NgModule }   from '@angular/core';

import { BrRoutingModule } from './br-routing.module';
import { SharedModule } from '../shared/shared.module';


import { ReportService } from './rpresent/services/report.service';
import {MemberSrvService} from './member/services/member-srv.service';
import {DmemberService} from './membersearch/services/dmember.service';
import { DashboardService } from './dashboard/services/dashboard.service';
import { GameChartsService } from './game/services/game-charts.service';


import { BRPageComponent } from './br-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DmemberComponent } from './membersearch/dmember.component';
import { GameComponent } from './game/game.component';
import { MemberComponent } from './member/member.component';
import { RpresentComponent } from './rpresent/rpresent.component';
import { GameSearchComponent } from './game-search/game-search.component';



import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {nvD3} from 'ng2-nvd3';
import { GaugeChartComponent } from './dashboard/gauge-chart.component';
import { GaugePayOffComponent } from './dashboard/gauge-payoff.component';
import {GaugeCommissionableComponent} from './dashboard/gauge-commissionable.component';
import {GaugeWagersComponent} from './dashboard/gauge-wagers.component';

import { DecimalPipe } from '@angular/common';
import { GameSortComponent } from './game-search/game-sort-panel.component';
import { GameCategoriesComponent } from './game-search/game-categories-panel.component';
import { GameCodeNameComponent } from './game-search/game-code-name-panel.component';
import { GamePickerComponent } from './game-search/game-picker.component';

// NgxChartsModule,
@NgModule({
  imports: [
    BrRoutingModule,
    SharedModule,
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
      BRPageComponent,
      DashboardComponent,
      DmemberComponent,
      GameComponent,
      MemberComponent,
      RpresentComponent,
      nvD3,
      GameSearchComponent,
      GaugeChartComponent,
      GaugeCommissionableComponent,
      GaugePayOffComponent,
      GaugeWagersComponent,
      GameSortComponent,
      GameCategoriesComponent,
      GameCodeNameComponent,
      GamePickerComponent
    ],
  providers:[
    ReportService,
    MemberSrvService,
    DmemberService,
    DashboardService,
    GameChartsService,
    DecimalPipe]
})
export class BRModule { }
