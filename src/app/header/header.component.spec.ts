import { BankService } from './../bank.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../header/header.component';
import { AppComponent } from '../app.component';

import {Routes} from "@angular/router";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Observable,BehaviorSubject} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let api: BankService;
  let fixture: ComponentFixture<HeaderComponent>;
  let username = '';
  let logKey = false;
  let userId = 0;
  let item = 0;
  const routes: Routes = [
    {path:'',component: HeaderComponent},
   ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[HttpClientTestingModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it("HeaderComponent set the intial variable", ()=>{
    component.username = '';
    component.logKey = false;
    component.userId = 0;
    
    localStorage.setItem('userName',"murugesh");
    localStorage.setItem('log',"true");
    localStorage.setItem('userId',"1");
    //api.uId.value = 0;
    if(localStorage.getItem('userName')){
      component.username = localStorage.getItem('userName');
      component.logKey = Boolean(localStorage.getItem("log"));
      component.userId = parseInt(localStorage.getItem('userId'));
    }
    expect(component.username).toEqual(localStorage.getItem('userName'));
    expect(component.logKey).toEqual(false);
    expect(component.item).toEqual(0);
    expect(component.userId).toEqual(0);
    component.ngOnInit();
  });

  it("Signout action its happened", ()=>{
    component.signOut();
  });
  
 


});
