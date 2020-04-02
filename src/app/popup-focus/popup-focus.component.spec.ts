import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFocusComponent } from './popup-focus.component';

describe('PopupFocusComponent', () => {
  let component: PopupFocusComponent;
  let fixture: ComponentFixture<PopupFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
