import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { BankService, payeeDetails } from '../bank.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.css']
})
export class FundsComponent implements OnInit {
  fundsForm: FormGroup;
  // payeeDetails:{};
  payto = [];
  username = '';
  payfrom = [];
  amount = new FormControl('', [Validators.required, Validators.pattern("^[0-9*]+(\.[0-9]{2}){0,1}$")]);
  // amount = new FormControl('',Validators.compose([Validators.required,this.amountValidate()]))
  transfrom = new FormControl('', [Validators.required]);
  transto = new FormControl('', [Validators.required]);
  toAsset = 0;
  uId = 0;
  errMsg = '';
  showModel:Boolean;
  constructor(private formBuilder: FormBuilder, private api: BankService, private router: Router) {
    if (!this.api.log.value) {
      this.api.err.next("Please Login!");
      this.router.navigate(['login']);
    } else {
      this.api.err.next("");
      this.api.uname.subscribe(data => this.username = data);
      this.uId = this.api.uId.value;
      if (localStorage.getItem('userName')) {
        this.username = localStorage.getItem('userName');
        this.uId = Number(localStorage.getItem('userId'));
      }
      this.api.getTotalAssets().subscribe(data => {
        this.toAsset = data[0].TotalAssets;
      });
    }
    this.fundsForm = this.formBuilder.group({
      amount: this.amount,
      transfrom: this.transfrom,
      transto: this.transto
    });
  }

  ngOnInit() {
    this.loadPayee();
  }

  amountValidate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      // console.log(typeof (control.value));
      const regex = new RegExp('^(?=.*?[0-9]){0,3}(\.\d{2)?$');
      const valid = regex.test(control.value);
      // console.log(valid);
      return valid ? null : { invalidNumber: true };
    };
  }

  async onSubmit() {
    if (this.fundsForm.valid) {
      // console.log(this.toAsset);
      //console.log(this.transto.value);
      this.showModel = true;
       if (Number(this.toAsset) > Number(this.amount.value)) {
         let tot = Number(this.toAsset) - Number(this.amount.value);
         const fundsTransfer = {
           amount: Number(this.amount.value),
           fromacctnumber: Number(this.transfrom.value),
           toacctnumber: Number(this.transto.value.tacNum),
           balance: Number(tot),
           transDetails: this.transto.value.tacNam
         };

         let arr = {
           id: Number(this.uId),
           TotalAssets: Number(tot)
         }
         await this.api.setAccountTransfer(fundsTransfer).subscribe();
         await this.api.updateTotalAssets(arr).subscribe(() => {
           this.showModel = false;
           this.router.navigate(['history']);
         });
        this.showModel = false;
       } else {
         this.showModel = false;
         this.errMsg = 'You dont have sufficient balance';
         setTimeout(()=>{
           this.fundsForm.reset();
           this.errMsg='';
           return false;
         },1500);
       }
    } else {
      Object.keys(this.fundsForm.controls).forEach(key => {
        this.fundsForm.controls[key].markAsDirty();
      });
    }
  }


  async loadPayee() {
    await this.api.getUserDetails().subscribe(data => {
      for (const [key, value] of (data as any).entries()) {
        const obj = {
          facNum: value.accounts[0].bankaccountnumber,
          facNam: value.accounts[0].bankname+' '+value.username,
          fName: value.username
        }
        if (value.username == this.username) {
          this.payfrom.push(obj);
        }
      }
    });
    await this.api.getPayeeDetails().subscribe(data => {
      for (const [key, value] of (data as any).entries()) {
        const obj = {
          tacNum: value.acctnumber,
          tacNam: value.acctnumber+' '+value.acctname,
        }
        this.payto.push(obj);
      }
    });
  }

  Cancelfunds() {
    this.router.navigate(['home']);
  }

}
