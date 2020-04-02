import { BankService } from './../bank.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";
import { SummaryComponent } from './summary.component';


describe('SummaryComponent', () => {
  let component: SummaryComponent;
   let api: BankService;
  let fixture: ComponentFixture<SummaryComponent>;
  const routes: Routes = [
    {path:'summary',component: SummaryComponent},
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the api services', () => {
    let arr = {
      "id": 1,
      "TotalAssets": 6293.35
    }
    //expect(api.getTotalAssets()).toBe(arr);
    api.getTotalAssets().subscribe(data => {
      expect(data).toEqual(arr);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
