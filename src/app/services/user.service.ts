import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  userObj;
  afRef;
  router;

  constructor(private af: AngularFire, _router : Router) {
    this.afRef = af;
    this.router = _router;
  }

  setUserData(data){
    this.userObj = data;
    console.log("saving in service");
    console.log(data, "saving in service");
    localStorage.setItem("userData", JSON.stringify(data));
  }
  getUserData(){
    let userObjTemp = JSON.parse(localStorage.getItem("userData"));
    return this.userObj || userObjTemp;
  }

  logoutUser(){
    this.afRef.auth.logout()
      .then(
        data => {
          localStorage.removeItem("userData")
          this.router.navigate(['/login'])
        },
        error => console.log('Error in Logout', error)
      );
  }

}
