import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

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
              {{ item.value.product_id}}
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

  @Output()
  removed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
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
