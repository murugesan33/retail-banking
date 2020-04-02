import { BankService } from './../bank.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let bankservice: BankService;

  let fixture: ComponentFixture<LoginComponent>;
  const routes: Routes = [
    {path:'login',component: LoginComponent},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(':', () => {

    function setup() {
      const api = TestBed.get(BankService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { api, httpTestingController };
    }

    it('#getUserDetails userdetails to get', ()=>{
      const { api, httpTestingController } = setup();
      const arr = {
        "id": 1,
        "username": "murugesh",
        "password": "123456",
        "accounts": [
          {
            "id": 1,
            "userid": 1,
            "bankname": "ICICI",
            "bankaccountnumber": "12345",
            "bankbranch": "Electronic city phase 1 2nd cross",
            "bankifsccode": "ICICI0012",
            "TotalAssets": 7873.35
          }
        ]
      };
      expect(api.getUserDetails()).toEqual(arr);
    });

    
    
    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });

  
});
