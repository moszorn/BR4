import { NgModule } from '@angular/core';
import {Routes, RouterModule,  PreloadAllModules} from '@angular/router';
/************
* Component *
************/
import { BRPageComponent } from './br-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DmemberComponent } from './membersearch/dmember.component';
import { GameComponent } from './game/game.component';
import { MemberComponent } from './member/member.component';
import { GameSearchComponent } from './game-search/game-search.component';

import { RpresentComponent } from './rpresent/rpresent.component';

import { GaugePayOffComponent } from './dashboard/gauge-payoff.component';
import {GaugeCommissionableComponent} from './dashboard/gauge-commissionable.component';
import {GaugeWagersComponent} from './dashboard/gauge-wagers.component';

 
/*  Can work   */
const routes: Routes = [  
     { path: '', component: BRPageComponent,
          children: [   
            { path: '', redirectTo:'Dashboard' , pathMatch:'full'},         
            { path: 'Dashboard',  component: DashboardComponent ,
               children : [               
                {path:'payoffD', component: GaugePayOffComponent , outlet:'payoff'},
                {path:'commissionableD', component: GaugeCommissionableComponent , outlet:'commissionable'},
                {path:'wagersD', component: GaugeWagersComponent , outlet:'wagers'},

                {path:'payoffW', component: GaugePayOffComponent , outlet:'payoff'},
                {path:'commissionableW', component: GaugeCommissionableComponent , outlet:'commissionable'},
                {path:'wagersW', component: GaugeWagersComponent , outlet:'wagers'},

                {path:'payoffM', component: GaugePayOffComponent , outlet:'payoff'},
                {path:'commissionableM', component: GaugeCommissionableComponent , outlet:'commissionable'},
                {path:'wagersM', component: GaugeWagersComponent , outlet:'wagers'}
              ]
        },           
            { path: 'Game', component: GameComponent  },           
            { path: 'Member', component: MemberComponent },
            { path: 'GamesInfo', component: GameSearchComponent},
            { path: 'MembersInfo/:memberType', component: DmemberComponent },
            { path: 'Report', component: RpresentComponent },
            { path: 'br/Report/:TDMY', component: RpresentComponent }
          ]
    }
];

//Never call RouterModule.forRoot in a feature-routing module.
//Always call RouterModule.forChild in a feature-routing module.
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrRoutingModule { }

