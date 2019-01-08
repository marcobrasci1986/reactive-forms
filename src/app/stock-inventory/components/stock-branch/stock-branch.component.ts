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

        <input
          type="text"
          placeholder="Manager code"
          formControlName="code"
        />
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
