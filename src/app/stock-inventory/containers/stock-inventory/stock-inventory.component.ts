import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '../../models/product.interface';

@Component({
  selector: 'app-stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">


        <app-stock-branch
          [parent]="form"
        >

        </app-stock-branch>

        <app-stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)"
        >

        </app-stock-selector>

        <app-stock-products
          [parent]="form"
          (removed)="removeStock($event)"
        >


        </app-stock-products>


        <div class="stock-inventory__buttons">

          <button
            type="submit"
            [disabled]="form.invalid"
          >
            Order stock
          </button>
        </div>

        <pre>
          {{ form.value | json }}
        </pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent {

  products: Product[] = [
    {'id': 1, 'price': 2800, 'name': 'MacBook Pro'},
    {'id': 2, 'price': 50, 'name': 'USB-C Adaptor'},
    {'id': 3, 'price': 400, 'name': 'iPod'},
    {'id': 4, 'price': 900, 'name': 'iPhone'},
    {'id': 5, 'price': 600, 'name': 'Apple Watch'},
  ];

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([
      this.createStock({product_id: 1, quantity: 10}),
      this.createStock({product_id: 3, quantity: 50})
    ])
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  createStock(stock): FormGroup {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  onSubmit() {
    console.log('submit:', this.form.value);
  }

  /**
   * Convert the pojo to a FormGroup
   * @param stock
   */
  addStock(stock) {
    const control = this.form.get('stock') as FormArray;

    control.push(this.createStock(stock));
  }

  /**
   * Destructure $event  to a pojo with group and index
   *
   * @param group
   * @param index
   */
  removeStock({group, index}: { group: FormGroup, index: number }) {
    // console.log(group, index);
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }
}
