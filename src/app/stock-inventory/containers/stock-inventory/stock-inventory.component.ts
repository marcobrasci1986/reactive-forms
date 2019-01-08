import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
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
        >

        </app-stock-selector>

        <app-stock-products
          [parent]="form"
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

  form = new FormGroup({
    store: new FormGroup({
      branch: new FormControl(''),
      code: new FormControl('')
    }),
    selector: new FormGroup({
      product_id: new FormControl(''),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([])
  });


  onSubmit() {
    console.log('submit:', this.form.value);
  }
}
