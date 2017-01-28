import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2'
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  userObj = {
    email: "",
    fullName: "",
    password: "",
    role: ""
  };

  usersRef;
  afRef:any;
  router;

  constructor(private af:AngularFire, _router: Router) {
    this.router = _router;
    this.afRef = af;
    this.usersRef = af.database.list("/users");
  }

  signupUser() {
    if (this.userObj.email.trim() != "" && this.userObj.fullName.trim() != "" && this.userObj.password.trim() != "") {
      this.userObj.role = "user";
      console.log(this.userObj);
      this.afRef.auth.createUser({email: this.userObj.email, password: this.userObj.password}).then(data=> {
        console.log(data.uid);
        this.afRef.database.object("/users/" + data.uid).set(this.userObj);
        alert("Successfully user created ");

        //clear data fields
        this.userObj = {
          email: "",
          fullName: "",
          password: "",
          role: ""
        };
        this.router.navigate(["/login"]);
      }, function (err) {
       console.log(err);
       alert(err.message);
       });

    }
    else {
      alert("Please fill all fields");
    }
  }
}
