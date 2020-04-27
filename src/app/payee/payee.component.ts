import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BankService, payeeDetails } from '../bank.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css']
})
export class PayeeComponent implements OnInit {
  payeeForm: FormGroup;
  showProduct = true;
  showModel: Boolean;
  payeeId: number;
  arrObj: [];
  title = "Add Payee";
  payeeDetails: {};
  filterargs = { name: '' };
  acctname = new FormControl('', [Validators.required]);
  nickname = new FormControl('', [Validators.required]);
  acctnumber = new FormControl('', [Validators.required]);
  ifsccode = new FormControl('', [Validators.required]);
  constructor(private formBuilder: FormBuilder, private api: BankService, private router: Router) {
    if (!this.api.log.value) {
      this.api.err.next("Please Login!");
      this.router.navigate(['login']);
    } else {
      this.api.err.next("");
    }
    this.payeeForm = this.formBuilder.group({
      acctname: this.acctname,
      nickname: this.nickname,
      acctnumber: this.acctnumber,
      ifsccode: this.ifsccode
    });
  }

  ngOnInit() {
    this.loadPayee();
  }

  loadPayee() {
    this.api.getPayeeDetails().subscribe(data => this.payeeDetails = data);
  }

  onSubmit() {
    if (this.payeeForm.valid) {
      const addPayee = <payeeDetails>{
        acctname: this.acctname.value,
        nickname: this.nickname.value,
        acctnumber: this.acctnumber.value,
        ifsccode: this.ifsccode.value,
      };

      if (this.payeeId) {
        addPayee.id = this.payeeId;
        this.api.updatePayee(addPayee).subscribe((data) => {
          this.showProduct = true;
          this.loadPayee();
        });

      } else {
        this.api.addPayee(addPayee).subscribe((data) => {
          this.showProduct = true;
          this.loadPayee();
        });
      }

    } else {
      Object.keys(this.payeeForm.controls).forEach(key => {
        this.payeeForm.controls[key].markAsDirty();
      });
    }
  }

  editPayee(obj) {
    // console.log(obj);
    this.showProduct = false;
    this.title = "Edit Payee";
    this.payeeId = obj.id;
    this.payeeForm.patchValue({
      acctname: obj.acctname,
      nickname: obj.nickname,
      acctnumber: obj.acctnumber,
      ifsccode: obj.ifsccode,
    })
  }

  deletePayee(obj) {
    this.showModel = true;
    this.arrObj = obj;
  }

  confirmModel(id) {
    if (id > 0) {
      this.api.deletePayee(id).subscribe((data) => {
        this.showModel = false;
        this.loadPayee();
      });
    }
  }

  closeModel(ev) {
    this.showModel = ev;
  }

  addNewPayee() {
    this.payeeForm.reset();
    this.showProduct = false;
  }

  CancelPayee() {
    this.showProduct = true;
  }

  filterItem(val) {
    this.filterargs.name = val
  }

  toggle() {
    console.log("Hi");
  }
}
