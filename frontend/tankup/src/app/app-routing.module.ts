import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RefuellingComponent} from './refuelling/refuelling.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RideComponent} from './ride/ride.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'refuelling', component: RefuellingComponent},
  {path: 'ride', component: RideComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
