import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'app-stock-products',
  styleUrls: ['./stock-products.component.scss'],
  template: `
    <div class="stock-product" [formGroup]="parent">

      <div formArrayName="stock">
        <div
          *ngFor="let item of stocks; let i = index">

          <div class="stock-product__content" [formGroupName]="i">
            <div class="stock-product__name">
              {{  getProduct(item.value.product_id).name }}
            </div>
            <div class="stock-product_price">
              {{  getProduct(item.value.product_id).price | currency: 'USD':true }}
            </div>
            <input
              type="number"
              step="10"
              min="10"
              max="1000"
              formControlName="quantity"
            >

            <button
              type="button"
              (click)="onRemove(item, i)"
            >
              Remove
            </button>
          </div>

        </div>

      </div>

    </div>
  `
})
export class StockProductsComponent implements OnInit {

  @Input()
  parent: FormGroup;

  @Input()
  map: Map<number, Product>;

  @Output()
  removed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  getProduct(id) {
    return this.map.get(id);
  }

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls;
  }

  onRemove(group: AbstractControl, index: number) {
    // Short hand for:
    // this.removed.emit({group: group, index: index});
    this.removed.emit({group, index});
  }
}
