import { BankService } from './../bank.service';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";
import { PayeeComponent } from './payee.component';

describe('PayeeComponent', () => {
  let component: PayeeComponent;
  let fixture: ComponentFixture<PayeeComponent>;

  const routes: Routes = [
    {path:'payee',component: PayeeComponent},
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeeComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
