import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BankService} from '../bank.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  displayerror = false;
  loginKey = "";
  errMsg = this.api.err.value;
  username = new FormControl('', Validators.required);
  password =  new FormControl('',Validators.required);
  userDetails: any = [];
  constructor(private formBuilder:FormBuilder,private api: BankService, private router:Router) { 

  }

  ngOnInit() {
    this.loginForm =this.formBuilder.group({
      username:this.username,
       password:this.password
     })
  }

  onSubmit() {
    this.submitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }
  this.loginDetails(this.username.value, this.password.value);
}

loginDetails(userName, Pwd) {
this.api.getUserDetails().subscribe(data => {
 // console.log(data);
      for (const [key,value] of (data as any).entries()) {
       // console.log(value.accounts);
       if(value.username == userName && value.password == Pwd){
            this.api.log.next(true);
            this.api.uname.next(value.username);
            this.api.uId.next(parseInt(value.id));
            //this.api.totalAsset.next(value.accounts[0].TotalAssets);
            localStorage.setItem('userName', value.username);
            localStorage.setItem('log',"true");
            localStorage.setItem("userId",value.id);
            localStorage.setItem("bankdetails", JSON.stringify(value.accounts));
         //   sessionStorage.setItem("totalAsset",value.accounts[0].TotalAssets);
        
          // this.api.getTotalAssets().subscribe()
            this.router.navigate(['home']);
        }else{
          this.errMsg = 'Your username & password Incorrect!';
          this.submitted = false;
          this.displayerror=true;
        }
      }
    });
}
  

}
