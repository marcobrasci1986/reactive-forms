import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-products',
  styleUrls: ['./stock-products.component.scss'],
  template: `
    <div class="stock-product" [formGroup]="parent">

    </div>
  `
})
export class StockProductsComponent implements OnInit {

  @Input()
  parent: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
