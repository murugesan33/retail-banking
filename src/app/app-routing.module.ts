import { HistoryComponent } from './history/history.component';
import { FundsComponent } from './funds/funds.component';
import { PayeeComponent } from './payee/payee.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'summary',component:SummaryComponent},
{path:'payee',component:PayeeComponent},
{path:'funds',component:FundsComponent},
{path:'history',component:HistoryComponent},
{path:'',  redirectTo: 'home',  pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
