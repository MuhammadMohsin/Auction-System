import {Component} from '@angular/core';
import {MdDialogRef, MdDialog} from '@angular/material'

@Component({
  selector: 'apply-bid',
  template: `
  <h1 md-dialog-title>Would you like to apply bid?</h1>
      
      <md-input-container>
        <input md-input [(ngModel)]="bidPrice" type="text" placeholder="Enter Your Bid">
      </md-input-container>
  <md-dialog-actions>
    <button md-dialog-close md-raised-button color="warn" >Cancel</button>
    <button md-raised-button color="primary" (click)="dialogRef.close(bidPrice)">Apply</button>
  </md-dialog-actions>
  `
})
export class ApplyBidDialog {
  bidPrice: String;
  constructor(public dialogRef: MdDialogRef<ApplyBidDialog>) {
  }
}
