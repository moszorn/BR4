import { NgModule } from '@angular/core';
import {Routes, RouterModule,  PreloadAllModules} from '@angular/router';

import { PocComponent } from './shared/poc/poc.component';
 const routes = [
    /*{ path: '', redirectTo:'poc' , pathMatch:'full'},*/
      { path: '', redirectTo:'br' , pathMatch:'full'},
      { path: 'poc', loadChildren: 'app/shared/poc/poc.module#PocModule'},
      { path: 'br',loadChildren: 'app/br/br.module#BRModule'}      
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false /* , preloadingStrategy: PreloadAllModules */ })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

