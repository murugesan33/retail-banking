import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-focus',
  templateUrl: './popup-focus.component.html',
  styleUrls: ['./popup-focus.component.css']
})
export class PopupFocusComponent implements OnInit {
  @Input('status') status:boolean = false;
  @Input('details') details = [];
  @Output('payeeId')payeeId: EventEmitter<Number> = new EventEmitter();
  @Output('close') close: EventEmitter<Number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  ShowModelConfirm(obj){
    this.payeeId.emit(obj.id);
  }

  hideModel(stat){
    this.close.emit(stat);
  }

}
