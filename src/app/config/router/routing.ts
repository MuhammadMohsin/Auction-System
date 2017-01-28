import { Routes } from '@angular/router';
import {LoginComponent} from "../../components/login.component/login.component";
import {SignupComponent} from "../../components/signup.component/signup.component";
import {AuctionComponent} from "../../components/auction.component/auction.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'auction',
    component: AuctionComponent
  }
];
