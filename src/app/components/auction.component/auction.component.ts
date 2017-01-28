import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'login',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent {
  afRef: any;
  feedbackRef: any;
  userAuth;
  router;
  userService;
  feedbackMsgList;

  newAuctionObj = {
    title: "",
    minBid : "",
    url: "",
    qty: "",
    desc: ""
  };

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService) {
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
    this.userAuth = this.userService.getUserData();
    this.feedbackRef = this.afRef.database.list("/feedbacks");
    this.feedbackRef.subscribe(feeds=>{
      this.feedbackMsgList = feeds;
    });

  }

  postNewAuction(){
    console.log(this.newAuctionObj)
  }

  logout() {
    this.userService.logoutUser();
  }
}
