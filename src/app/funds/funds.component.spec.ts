import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";

import { FundsComponent } from './funds.component';
import { LoginComponent } from '../login/login.component';

describe('FundsComponent', () => {
  let component: FundsComponent;
  let fixture: ComponentFixture<FundsComponent>;
  const routes: Routes = [
    {path:'funds',component: FundsComponent},
    {path:'login',component: LoginComponent},
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
