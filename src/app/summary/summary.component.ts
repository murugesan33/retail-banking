import { Component, OnInit } from '@angular/core';
import { BankService} from '../bank.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public logKey = this.api.log.value;
  public userId = this.api.uId.value;
  public arrBankDetails = [];
  public total = 0;

  constructor(private api: BankService, private router:Router) { }

  ngOnInit() {
    if(!this.logKey){
      this.api.err.next("Please Login!");
      this.router.navigate(['login']);
    }else{
      let arr ={
        id:this.userId
      }
      this.api.getTotalAssets().subscribe(data => {

          this.total = data[0].TotalAssets;
      });
      this.api.getUserDetails().subscribe(data => {
        //console.log(data);
        this.arrBankDetails = data[0].accounts[0];
        //console.log(this.arrBankDetails);
      });
   }
  }

}
