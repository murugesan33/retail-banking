import { BankService } from './../bank.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';
  logKey = false;
  userId = 0;
  item = 0;
  constructor(private router:Router, private api :BankService) {
    this.api.log.subscribe(data => this.logKey = data);
    this.api.uname.subscribe(data => this.username = data);
    // this.api.item.subscribe(data =>{this.item = data});

    if(JSON.parse(sessionStorage.getItem('item'))){
      // this.item = JSON.parse(sessionStorage.getItem('item'));
    }
    if(localStorage.getItem('userName')){
       this.username = localStorage.getItem('userName');
       this.logKey = Boolean(localStorage.getItem("log"));
       this.api.uId.next(parseInt(localStorage.getItem('userId')));
       this.api.log.next(Boolean(localStorage.getItem("log")));
    }
  }

 

  ngOnInit() {
  }

  signOut() {
    this.api.log.next(false);
    this.api.uname.next('');
    this.api.uId.next(0);
    this.api.err.next('');
    localStorage.removeItem('userName');
    localStorage.removeItem('log');
    localStorage.removeItem('userId');
    // sessionStorage.clear();
    // this.api.productItem.next([]);
    this.router.navigate(['home']);
  }

}
