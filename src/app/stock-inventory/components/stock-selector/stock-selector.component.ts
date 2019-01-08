import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-selector',
  styleUrls: ['./stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="parent">

    </div>
  `
})
export class StockSelectorComponent implements OnInit {

  @Input()
  parent: FormGroup;


  constructor() {
  }

  ngOnInit() {
  }

}
