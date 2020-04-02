import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {Routes} from "@angular/router";

import { HistoryComponent } from './history.component';
import { LoginComponent } from '../login/login.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent,LoginComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  const routes: Routes = [
    {path:'history',component: HistoryComponent},
    // {path:'login',component: LoginComponent},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule.withRoutes(routes)],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
