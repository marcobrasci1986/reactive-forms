import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Item, Product} from '../../models/product.interface';
import {StockInventoryService} from '../../services/stock-inventory.service';
import {forkJoin} from 'rxjs/observable/forkJoin';

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
          [map]="productMap"
        >
        </app-stock-products>

        <div class="stock-inventory__price">
          Total: {{total | currency: 'USD':true}}
        </div>


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
export class StockInventoryComponent implements OnInit {

  products: Product[];

  productMap: Map<number, Product>;
  total: number;

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: ''
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private stockInventoryService: StockInventoryService
  ) {
  }

  ngOnInit(): void {
    const cartObservable = this.stockInventoryService.getCartItems();
    const productsObservable = this.stockInventoryService.getProducts();


    forkJoin(cartObservable, productsObservable).subscribe(([cart, products]: [Item[], Product[]]) => {
      const myMap = products.map<[number, Product]>(product => [product.id, product]);

      this.productMap = new Map<number, Product>(myMap);
      this.products = products;

      // add an item to the 'stock' property of the form
      cart.forEach(item => this.addStock(item));

      this.initializeTotalOnInit();
      this.form.get('stock')
        .valueChanges.subscribe(value => this.calculateTotal(value));
    });

  }

  private initializeTotalOnInit() {
    this.calculateTotal(this.form.get('stock').value);
  }

  calculateTotal(value: Item[]) {
    const initialValue = 0;
    this.total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, initialValue);
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
