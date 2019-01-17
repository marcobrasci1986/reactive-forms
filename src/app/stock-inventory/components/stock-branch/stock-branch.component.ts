import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stock-branch',
  styleUrls: ['./stock-branch.component.scss'],
  template: `
    <div [formGroup]="parent">
      <div formGroupName="store">
        <input
          type="text"
          placeholder="Branch Id"
          formControlName="branch"/>

        <div class="error" *ngIf="required('branch')">
          Branch id is required
        </div>
        <div class="error" *ngIf="invalid">
          Invalid branch code: 1 letter, 2 numbers
        </div>
        <div class="error" *ngIf="unknown">
          Unknown branch, please check the ID
        </div>
        <input
          type="text"
          placeholder="Manager code"
          formControlName="code"
        />

        <div class="error" *ngIf="required('code')">
          Manager id is required
        </div>
      </div>

    </div>
  `
})
export class StockBranchComponent implements OnInit {

  @Input()
  parent: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Mutually exclusive with the required message
   */
  get invalid() {
    return this.parent.get('store.branch').hasError('invalidBranch') &&
      this.parent.get('store.branch').dirty &&
      !this.required('branch');
  }

  get unknown() {
    return this.parent.get('store.branch').hasError('unknownBranch') &&
      this.parent.get('store.branch').dirty;
  }

  // touched: focus + blur
  // dirty: typed interaction
  required(name: string) {
    console.log('required');
    return (
      this.parent.get(`store.${name}`).hasError('required') &&
      this.parent.get(`store.${name}`).touched
    );
  }
}
