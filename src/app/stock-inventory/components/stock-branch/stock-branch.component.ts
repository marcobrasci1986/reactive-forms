import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

//Start Here Validators object for FormControls 4:46
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

        <div class="error" *ngIf="parent.get('store.branch').hasError('required') && parent.get('store.branch').touched">
          Branch id is required
        </div>
        <input
          type="text"
          placeholder="Manager code"
          formControlName="code"
        />

        <div class="error" *ngIf="parent.get('store.code').hasError('required') && parent.get('store.code').touched">
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

}
