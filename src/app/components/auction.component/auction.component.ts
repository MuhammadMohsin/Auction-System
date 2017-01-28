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
  AuctionRef: any;
  userAuth;
  router;
  userService;
  AuctionsList;

  newAuctionObj = {
    title: "",
    minBid : "",
    url: "",
    qty: "",
    desc: "",
    lastMaxBid : ""
  };

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService) {
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
    this.userAuth = this.userService.getUserData();
    this.AuctionRef = this.afRef.database.list("/auctions");
    this.AuctionRef.subscribe(feeds=>{
      this.AuctionsList = feeds;
    });

  }

  postNewAuction(){
    if(this.newAuctionObj.title.trim()!="" && this.newAuctionObj.minBid.trim()!="" && this.newAuctionObj.qty.trim()!="" && this.newAuctionObj.desc.trim()!=""){
      console.log(this.newAuctionObj);
      this.newAuctionObj.lastMaxBid = "";
      this.AuctionRef.push(this.newAuctionObj)
        .then(data=>{
          this.newAuctionObj = {
            title: "",
            minBid : "",
            url: "",
            qty: "",
            desc: "",
            lastMaxBid : ""
          };
          alert("Auction posted successfully");
        }, err=>{
          alert(err.message);
        })
    }
    else{
      alert("Please alert all required fields");
    }

  }

  logout() {
    this.userService.logoutUser();
  }
}
