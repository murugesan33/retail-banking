import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BankService, payeeDetails} from '../bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  fundsForm:FormGroup;
  // payeeDetails:{};
  payto = [];
  username = '';
  payfrom = [];
  amount = new FormControl('',[Validators.required]);
  transfrom = new FormControl('',[Validators.required]);
  transto = new FormControl('',[Validators.required]);
  toAsset = 0;
  uId = 0;
  constructor(private formBuilder: FormBuilder, private api: BankService, private router: Router) {
      if(!this.api.log.value){
        this.api.err.next("Please Login!");
        this.router.navigate(['login']);
      }else{
        this.api.err.next("");
        this.api.uname.subscribe(data => this.username = data);
        this.uId = this.api.uId.value;
        if(localStorage.getItem('userName')){
          this.username = localStorage.getItem('userName');
          this.uId = Number(localStorage.getItem('userId'));
       }
       this.api.getTotalAssets().subscribe(data => {
         this.toAsset = data[0].TotalAssets;
       });
      }
      this.fundsForm = this.formBuilder.group({
        amount : this.amount,
        transfrom: this.transfrom,
        transto:this.transto
    });
  }

  ngOnInit() {
    this.loadPayee();
    //console.log(this.toAsset)
  }


  onSubmit(){
    if (this.fundsForm.valid) {
     // console.log(this.toAsset+'---'+this.amount.value);
      if(Number(this.toAsset) > Number(this.amount.value)){
        let tot = Number(this.toAsset) - Number(this.amount.value);
        const fundsTransfer =  {
          amount : Number(this.amount.value),
          fromacctnumber: Number(this.transfrom.value),
          toacctnumber:Number(this.transto.value),
          balance:Number(tot)
        };
  
           let arr={
            id:Number(this.uId),
            TotalAssets:Number(tot)
          }
         this.api.updateTotalAssets(arr).subscribe((data) => {
              console.log(data);
          })
        
        
        
        this.api.setAccountTransfer(fundsTransfer).subscribe((data)=>{
          //this.router.navigate(['home']);
         // console.log(arr);
       
        });
      }else{
          alert("You dont have sufficient balance");
          this.fundsForm.reset();
          return false;
      }
    }else{
      console.log(this.fundsForm.controls);
      Object.keys(this.fundsForm.controls).forEach(key => {
        this.fundsForm.controls[key].markAsDirty();
      });
      console.log(this.fundsForm);
    }
  }


  loadPayee(){
    this.api.getUserDetails().subscribe(data => {
      for (const [key,value] of (data as any).entries()) {
        if(value.username == this.username){
            this.payfrom.push(value.accounts[0].bankaccountnumber);
            this.toAsset = value.accounts[0].TotalAssets;
        }
       }
      // console.log(this.payfrom);
    });
    this.api.getPayeeDetails().subscribe(data => {
        for (const [key,value] of (data as any).entries()) {
            this.payto.push(value.acctnumber);
        }
    });
  }

  Cancelfunds(){
    this.router.navigate(['home']);
  }

}
