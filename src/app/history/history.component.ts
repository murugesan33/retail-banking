import { Component, OnInit } from '@angular/core';
import { BankService, payeeDetails} from '../bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  arrItem = [];
  constructor(private api: BankService, private router: Router) {
    if(!this.api.log.value){
      this.api.err.next("Please Login!");
      this.router.navigate(['login']);
    }
   }

  ngOnInit() {
      this.api.getAccountTransfer().subscribe((data) => {
        for (const [key,value] of (data as any).entries()) {
              this.arrItem.push(value);
         }
      });
  }

}
