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
  auctionsList = [];
  myPostedAuctionsList = [];
  myAwardedAuction = [];

  newAuctionObj = {
    title: "",
    minBid : "",
    url: "",
    qty: "",
    desc: "",
    lastMaxBid : "",
    lastBidBy : "",
    postedBy: "",
    bidAwardedTo: ""
  };

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService) {
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
    this.userAuth = this.userService.getUserData();
    let authUserKey: String = this.userAuth.$key;

    this.AuctionRef = this.afRef.database.list("/auctions");
    this.AuctionRef.subscribe(auctions=>{
      this.auctionsList = [];
      this.myPostedAuctionsList = [];
      this.myAwardedAuction = [];
      this.auctionsList = auctions;
      this.auctionsList.forEach(auctionObj=>{
        if(auctionObj.postedBy == authUserKey){
          this.myPostedAuctionsList.push(auctionObj);
        }
        if(auctionObj.bidAwardedTo == authUserKey){
          this.myAwardedAuction.push(auctionObj);
        }
      })

    });

  }

  postNewAuction(){
    if(this.newAuctionObj.title.trim()!="" && this.newAuctionObj.minBid.trim()!="" && this.newAuctionObj.qty.trim()!="" && this.newAuctionObj.desc.trim()!=""){
      console.log(this.newAuctionObj);
      this.newAuctionObj.lastMaxBid = "";
      this.newAuctionObj.postedBy =  this.userAuth.$key;
      this.AuctionRef.push(this.newAuctionObj)
        .then(data=>{
          this.newAuctionObj = {
            title: "",
            minBid : "",
            url: "",
            qty: "",
            desc: "",
            lastMaxBid : "",
            lastBidBy : "",
            postedBy: "",
            bidAwardedTo: ""
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

  applyBid(auctionObj){
    console.log(auctionObj);
  }

  awardBid(auctionObj){
    console.log(auctionObj);
    auctionObj.bidAwardedTo = auctionObj.lastBidBy;

    let awardedTo: String= auctionObj.lastBidBy;
    this.AuctionRef.update("-Kb_YFh1qKKakfvnZDNZ",{ bidAwardedTo: awardedTo })
      .then(data=>{
        alert("Auction awarded successfully");
      }, err=>{
        alert(err.message);
      })
  }

  logout() {
    this.userService.logoutUser();
  }
}
