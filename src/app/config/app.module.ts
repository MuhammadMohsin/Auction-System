import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, myFirebaseAuthConfig } from './environments/firebase.config';
import {MaterialModule} from '@angular/material';
import {RouterModule} from "@angular/router";
import {routes} from "./router/routing";
import { AppComponent } from '../components/root.component/app.component';
import { SignupComponent } from '../components/signup.component/signup.component';
import { LoginComponent } from '../components/login.component/login.component';
import {UserService} from "../services/user.service";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AuctionComponent} from "../components/auction.component/auction.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AuctionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  providers: [UserService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
