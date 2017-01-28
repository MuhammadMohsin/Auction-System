import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service'
import { MdDialogRef, MdDialog } from '@angular/material'
import {ApplyBidDialog} from "../../models/apply.bid";

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

  constructor(private af: AngularFire, private _router: Router, private _userService: UserService,public dialog: MdDialog) {
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

  awardBid(auctionObj){
    console.log(auctionObj);
    auctionObj.bidAwardedTo = auctionObj.lastBidBy;

    let awardedTo: String= auctionObj.lastBidBy;
    let key:String = auctionObj.$key;
    this.AuctionRef.update(key,{ bidAwardedTo: awardedTo })
      .then(data=>{
        alert("Auction awarded successfully");
      }, err=>{
        alert(err.message);
      })
  }

  dialogRef: MdDialogRef<ApplyBidDialog>;

  applyBid(auctionObj) {
    console.log(auctionObj);


    let minBid: Number = Number(auctionObj.lastMaxBid);
    this.dialogRef = this.dialog.open(ApplyBidDialog,{disableClose: false});

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
      if(!result){
        return null;
      }

      if(isNaN(result)){
        alert("Please enter correct value");
        return null;
      }
      let offeredBid = Number(result);
      let minBid: Number = Number(auctionObj.minBid);
      if(auctionObj.lastMaxBid){
        let lastBid: Number = Number(auctionObj.lastMaxBid);
        if(offeredBid <= lastBid ){
          alert("Your bid is not acceptable!! Last max bid is :" + auctionObj.lastMaxBid);
        }
        if(offeredBid > Number(auctionObj.lastMaxBid)){

          let key:String = auctionObj.$key;
          let authUserKey: String = this.userAuth.$key;
          this.AuctionRef.update(key,{ lastBidBy: authUserKey, lastMaxBid : result })
            .then(data=>{
              alert("Auction bidded successfully");
            }, err=>{
              alert(err.message);
            })
        }
      }

      else if(offeredBid <= minBid ){
        alert("Your bid is not acceptable!! Minimum bid requirement is :" + auctionObj.minBid);
      }



      /* else{
        alert("Your bid is acceptable");
      }*/

    });
  }

  logout() {
    this.userService.logoutUser();
  }
}


